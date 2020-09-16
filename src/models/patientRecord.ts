import { Document, Schema, model } from 'mongoose';
import PatientRecordModel from '../interfaces/IPatientRecord';

const PatientRecordSchema = new Schema({
    appointmentDate: {
        type: Date,
        required: true
    },
    annotations: {
        type: String,
        required: true,
        selected: false,
        validate: {
            validator: function(v: string): boolean {
                return v.length <= 1000;
            },
            message: props => `${props.value} the street name is too long.`
        }
    },
    prescription: {
        type: String,
        selected: false,
        required: true,
        validate: {
            validator: function(v: string): boolean {
                return v.length <= 200;
            },
            message: props => `${props.value} the street name is too long.`
        }
    },
    lastUpdate: {
        type: Date,
        required: true
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }
});

export default model<PatientRecordModel & Document>('PatientRecord', PatientRecordSchema);
