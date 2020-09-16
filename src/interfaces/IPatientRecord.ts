import { Schema } from 'mongoose';

interface PatientRecordModel {
    appointmentDate: Date,
    annotations: string,
    prescription: string,
    lastUpdate: Date,
    patient?: Schema.Types.ObjectId,
}

export default PatientRecordModel;
