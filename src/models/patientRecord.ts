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
        required: false,
        validate: {
            validator: function(v: string): boolean {
                return v.length <= 200;
            },
            message: props => `${props.value} the street name is too long.`
        }
    },
    lastUpdate: {
        type: Date,
        required: false
    }
});

export default model<PatientRecordModel & Document>('PatientRecord', PatientRecordSchema);
