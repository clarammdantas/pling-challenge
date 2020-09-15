"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AddressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length <= 50;
            },
            message: props => `${props.value} the street name is too long.`
        }
    },
    district: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length <= 25;
            },
            message: props => `${props.value} the district name is too long.`
        }
    },
    zipCode: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                const regex1 = /\d{8}/;
                const regex2 = /\d{5}-\d{3}/;
                return regex1.test(v) || regex2.test(v);
            },
            message: props => `${props.value} is not a valid zip code.`
        }
    },
    number: {
        type: Number,
        required: true,
        max: 99999
    },
    complement: {
        type: String,
        required: false,
        validate: {
            validator: function (v) {
                return v.length <= 30;
            },
            message: props => `${props.value} the district name is too long.`
        }
    }
});
exports.default = mongoose_1.model('Adrress', AddressSchema);