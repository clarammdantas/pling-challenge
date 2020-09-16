// Models
import Patient from '../models/patient';

// Types
import AddressModel from '../interfaces/IAddress';
// import PatientRecordModel from '../interfaces/IPatientRecords';
import Schema from 'mongoose';

// Services
import addressService from './addressService';
import patientRecordService from './patientRecordService';

class PatientService {
    private static instance: PatientService;

    private constructor() {}

    static getInstance() {
        if (!PatientService.instance) {
            PatientService.instance = new PatientService();
        }

        return PatientService.instance;
    }

    async createPatient(name: string, address: AddressModel, age: number, cpf: string,
                        sex: number, profession: string, cellNumber: string) {
        try {
            // Create the address for this user.
            const newAddress = await addressService.createAddress(address.street, address.district,
                                                                  address.zipCode, address.number,
                                                                  address.complement);

            const newAddressId = newAddress._id;
            // Makes all cpf be inserted as a string containing only digits to standardize
            // the values for this property in the DB.
            const standardCPF = cpf.replace(/\D/g, '');
            const patient = new Patient({ name,
                                          address: newAddressId,
                                          age,
                                          cpf: standardCPF,
                                          sex,
                                          profession,
                                          cellNumber });
            await patient.save();

            return patient;
        } catch (err) {
            throw new Error(`Error while trying to create a Patient obj. Details: ${err}`);
        }
    }

    async addPatientRecord(patientId: string, appointmentDate: Date, annotations: string,
                           lastUpdate: Date, prescription: string) {
        try {
            const record = await patientRecordService.createPatientRecord(appointmentDate,
                                                                          annotations,
                                                                          prescription,
                                                                          lastUpdate);
            const recordId = record._id;
            const patient = await Patient.findByIdAndUpdate(patientId, { $push: {records: recordId} }, function(err, res) {
                if (err) {
                    return new Error(`It wasn't possible to add record to patient ${patientId}`);
                } else {
                    return res;
                }
            });

            return patient;
        } catch (err) {
            throw new Error(`Error while trying to add a new record in patient ${patientId}`);

        }
    }

    async getPatientByCPF(cpf: string) {
        try {
            const standardCPF = cpf.replace(/\D/g, '');
            const patient = await Patient.find({cpf: standardCPF})
                                         .select('+cpf +cellNumber +records')
                                         .exec();

            return patient;
        } catch {
            throw new Error(`A patient with CPF ${cpf} wasn't found.`);
        }
    }
}

const patientService = PatientService.getInstance();

export default patientService;
