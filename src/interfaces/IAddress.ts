import { Schema } from 'mongoose';

interface AddressModel {
    street: string,
    district: string,
    zipCode: string,
    number: number,
    patient?: Schema.Types.ObjectId,
    complement?: string
}

export interface AddressUpdate {
    street?: string,
    district?: string,
    zipCode?: string,
    number?: number,
    patient?: Schema.Types.ObjectId,
    complement?: string
}

export default AddressModel;
