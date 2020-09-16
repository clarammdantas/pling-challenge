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
const patient_1 = __importDefault(require("../models/patient"));
// Services
const addressService_1 = __importDefault(require("./addressService"));
class PatientService {
    constructor() { }
    static getInstance() {
        if (!PatientService.instance) {
            PatientService.instance = new PatientService();
        }
        return PatientService.instance;
    }
    createPatient(name, address, age, cpf, sex, profession, cellNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create the address for this user.
                const newAddress = yield addressService_1.default.createAddress(address.street, address.district, address.zipCode, address.number, address.complement);
                const newAddressId = newAddress._id;
                // Makes all cpf be inserted as a string containing only digits to standardize
                // the values for this property in the DB.
                const standardCPF = cpf.replace(/\D/g, '');
                const patient = new patient_1.default({ name,
                    address: newAddressId,
                    age,
                    cpf: standardCPF,
                    sex,
                    profession,
                    cellNumber });
                yield patient.save();
                return patient;
            }
            catch (err) {
                throw new Error(`Error while trying to create a Patient obj. Details: ${err}`);
            }
        });
    }
}
const patientService = PatientService.getInstance();
exports.default = patientService;
