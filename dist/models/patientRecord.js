"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PatientRecordSchema = new mongoose_1.Schema({
    appointmentDate: {
        type: Date,
        required: true
    },
    annotations: {
        type: String,
        required: true,
        selected: false,
        validate: {
            validator: function (v) {
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
            validator: function (v) {
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Patient'
    }
});
exports.default = mongoose_1.model('PatientRecord', PatientRecordSchema);
