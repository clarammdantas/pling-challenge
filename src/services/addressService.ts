import Address from '../models/address';
import AddressModel from '../interfaces/IAddress';

class AddressService {
    private static instance: AddressService;

    private constructor() {}

    static getInstance() {
        if (!AddressService.instance) {
            AddressService.instance = new AddressService();
        }

        return AddressService.instance;
    }

    async createAddress(street: string, district: string, zipCode: string,
                        number: number, complement?: string) {
        try {
            const addressData: AddressModel = {
              street,
              district,
              zipCode,
              number,
            }

            if (complement) {
              addressData.complement = complement;
            }

            const address = new Address(addressData);
            await address.save();

            return address;
        } catch (err) {
            throw new Error(`Error while tying to create an Address obj. Details: ${err}`);
        }
    }
}

const addressService = AddressService.getInstance();

export default addressService;
