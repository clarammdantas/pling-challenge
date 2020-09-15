interface AddressModel {
    street: string,
    district: string,
    zipCode: string,
    number: number,
    complement?: string
}

export interface AddressUpdate {
    street?: string,
    district?: string,
    zipCode?: string,
    number?: number,
    complement?: string
}

export default AddressModel;
