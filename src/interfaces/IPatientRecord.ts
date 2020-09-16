interface PatientRecordModel {
    appointmentDate: Date,
    annotations: string,
    prescription?: string,
    lastUpdate?: Date
}

export default PatientRecordModel;
