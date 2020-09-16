// Models
import PatientRecord from '../models/patientRecord';

class PatientRecordService {
    private static instance;

    private constructor() {}

    static getInstance() {
        if (!PatientRecordService.instance) {
            PatientRecordService.instance = new PatientRecordService();
        }

        return PatientRecordService.instance;
    }

    async createPatientRecord(appointmentDate: Date, annotations: string,
                              prescription?: string, lastUpdate?: Date) {

        try {
            const patientRecord = new PatientRecord({appointmentDate,
                                                     annotations,
                                                     prescription,
                                                     lastUpdate});
            await patientRecord.save();

            return patientRecord;
        } catch (err) {
            throw new Error(`Error while trying to create a new patient record. Details: ${err}`);
        }
    }
}
