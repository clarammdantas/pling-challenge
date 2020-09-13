import mongoose from "mongoose";
import isValidCep from "@brazilian-utils/is-valid-cep";

const Schema = mongoose.Schema;

const Address = new Schema ({
    street: {
        type: String,
        required: true,
        max: 50
    },
    district: {
        type: String,
        required: true,
        max: 25
    },
    zipCode: {
        type: String,
        required: true,
        max: 8,
        validate: {
            validator: function(v) {
                return isValidCep(v);
            },
            message: props => `${props.value} is not a valid CEP.`
        }
    },
    number: {
        type: Number,
        required: true,
        max: 99999  // Most countries use at most 5-digit numbers
        // to identify housing properties.
    },
    complement: {
        type: String,
        required: false,
        max: 50
    }
});

module.exports = mongoose.model('Address', Address);
