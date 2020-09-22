"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PatientSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length <= 50;
            },
            message: props => `${props.value} the street name is too long.`
        }
    },
    address: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Address',
        selected: false,
        required: true
    },
    age: {
        type: Number,
        required: true,
        max: 123 // The longest a human has ever lived is 123 years.
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
        select: false,
        // with sensitive info, like someone's CPF. So you have to
        // explicitly ask for this attribute.
        validate: {
            validator: function (v) {
                const regex = /\d{11}/;
                return regex.test(v);
            },
            message: props => `${props.value} the street name is too long.`
        }
    },
    sex: {
        type: Number,
        // this case as there is no possible variations.
        enum: [0, 1],
        required: true
    },
    profession: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length <= 30;
            },
            message: props => `${props.value} the street name is too long.`
        }
    },
    cellNumber: {
        type: String,
        required: true,
        selected: false,
        validate: {
            validator: function (v) {
                const regex1 = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{5}[-\s\.]?[0-9]{4}$/;
                return regex1.test(v);
            },
            message: props => `${props.value} the street name is too long.`
        }
    },
    records: [{
            type: mongoose_1.Schema.Types.ObjectId,
            required: false,
            selected: false,
            ref: 'PatientRecord'
        }]
});
var Gender;
(function (Gender) {
    Gender[Gender["Female"] = 1] = "Female";
    Gender[Gender["Male"] = 2] = "Male";
})(Gender || (Gender = {}));
PatientSchema.methods.getGender = function () {
    return this.gender > 0 ? 'Male' : 'Female';
};
exports.default = mongoose_1.model('Patient', PatientSchema);
