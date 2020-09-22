// Models
import Address from '../models/address';

// Types
import AddressModel, { AddressUpdate } from '../interfaces/IAddress';

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
              number
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

    async deleteAddress(addressId: string) {
        try {
            Address.deleteOne({_id: addressId});
        } catch (err) {
            throw new Error(`Error while tying to delete an Address obj. Details: ${err}`);
        }
    }

    async editAddress(addressId: string, attrsToUpdate: AddressUpdate) {
        try {
            const address = await Address.findByIdAndUpdate(addressId, attrsToUpdate, function(err, result) {
                if (err) {
                    return new Error(`Error while updating address with id ${addressId}. Error: ${err}`);
                } else {
                    return result;
                }
            });

            return address;
        } catch (err) {
            throw new Error(`Error while updating address with id ${addressId}. ${err}`);
        }
    }

    async getAddress(addressId: string) {
        try {
            const address = await Address.findById(addressId);

            return address;
        } catch (err) {
            throw new Error(`Error while trying to get Address obj. with id: ${addressId}`);
        }
    }
}

const addressService = AddressService.getInstance();

export default addressService;
