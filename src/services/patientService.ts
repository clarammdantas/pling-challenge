// Models
import Patient from '../models/patient';

// Types
import AddressModel, { AddressUpdate } from '../interfaces/IAddress';

// Services
import addressService from './addressService';
import patientRecordService from './patientRecordService';

const ELEM_PER_PAGE = 5;

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
            const patientId = patient._id;
            const addressUpdate: AddressUpdate = {patient: patientId}
            await addressService.editAddress(newAddressId, addressUpdate);

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
                                                                          patientId,
                                                                          lastUpdate);
            const recordId = record._id;
            const patient = await Patient.findById(patientId);
            patient!.records.push(recordId);
            await patient!.save();

            return patient;
        } catch (err) {
            throw new Error(`Error while trying to add a new record in patient ${patientId}`);

        }
    }

    async getPatientByCPF(cpf: string) {
        try {
            const standardCPF = cpf.replace(/\D/g, '');
            const patient = await Patient.findOne({cpf: standardCPF})
                                         .populate('address')
                                         .populate('records')
                                         .select('+cpf +cellNumber +records')
                                         .exec();

            return patient;
        } catch {
            throw new Error(`A patient with CPF ${cpf} wasn't found.`);
        }
    }

    async listPatients(page: number) {
        try {
            const patientPage = await Patient.find({})
                                             .select('+cpf')
                                             .populate('records')
                                             .populate('address')
                                             .skip((ELEM_PER_PAGE * page) - ELEM_PER_PAGE)
                                             .limit(ELEM_PER_PAGE);
            return patientPage;
        } catch (err) {
            throw new Error('Error while listing patients.');
        }
    }
}

const patientService = PatientService.getInstance();

export default patientService;
