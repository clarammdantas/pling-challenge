import { Schema, Document, model } from 'mongoose';

import Address from './address';

const PatientSchema = new Schema({
    name: {
        type: string,
        required: true,
        validate: {
            validator: function(v: string): boolean {
                return v.length <= 50;
            },
            message: props => `${props.value} the street name is too long.`
        }
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        selected: false,
        required: true
    },
    age: {
        type: Number,
        required: true,
        max: 123  // The longest a human has ever lived is 123 years.
    },
    cpf: {
        type: String,
        required: true,
        select: false,  // This is for security reasons to prevent selecting objects
                        // with sensitive info, like someone's CPF. So you have to
                        // explicitly ask for this attribute.
        validate: {
            validator: function(v: string): boolean {
                const regex = /\d{11}/;

                return regex.test(v);
            },
            message: props => `${props.value} the street name is too long.`
        }
    },
    sex: {
        type: Number,  // It's easier to deal with numbers than with strings in
                       // this case as there is no possible variations.
        enum: [0, 1],
        required: true
    },
    profession: {
        type: String,
        required: true,
        validate: {
            validator: function(v: string): boolean {
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
            validator: function(v: string): boolean {
                const regex1 = /(\d{2}) \d{5}-\d{4}/;
                const regex2 = /\d{11}/;

                return regex1.test(v) || regex2.test(v);
            },
            message: props => `${props.value} the street name is too long.`
        }
    }
});

enum Gender {
    Female = 1,
    Male = 2
}

export default model('Patient', PatientSchema);
