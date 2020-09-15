"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Models
const address_1 = __importDefault(require("../models/address"));
class AddressService {
    createAddress(street, district, zipCode, number, complement) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addressData = {
                    street,
                    district,
                    zipCode,
                    number,
                };
                if (complement) {
                    addressData.complement = complement;
                }
                const address = new address_1.default(addressData);
                yield address.save();
                return address;
            }
            catch (err) {
                throw new Error(`Error while tying to create an Address obj. Details: ${err}`);
            }
        });
    }
    editAddress(addressId, attrsToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield address_1.default.findByIdAndUpdate(addressId, attrsToUpdate, function (err, result) {
                    if (err) {
                        return new Error(`Error while updating address with id ${addressId}. Error: ${err}`);
                    }
                    else {
                        return result;
                    }
                });
                return address;
            }
            catch (err) {
                throw new Error(`Error while updating address with id ${addressId}. ${err}`);
            }
        });
    }
    getAddress(addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield address_1.default.findById(addressId);
                return address;
            }
            catch (err) {
                throw new Error(`Error while trying to get Address obj. with id: ${addressId}`);
            }
        });
    }
}
exports.default = AddressService;
