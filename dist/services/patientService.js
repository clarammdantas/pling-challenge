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
const patientRecordService_1 = __importDefault(require("./patientRecordService"));
const ELEM_PER_PAGE = 5;
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
                const patientId = patient._id;
                const addressUpdate = { patient: patientId };
                yield addressService_1.default.editAddress(newAddressId, addressUpdate);
                return patient;
            }
            catch (err) {
                throw new Error(`Error while trying to create a Patient obj. Details: ${err}`);
            }
        });
    }
    addPatientRecord(patientId, appointmentDate, annotations, lastUpdate, prescription) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const record = yield patientRecordService_1.default.createPatientRecord(appointmentDate, annotations, prescription, patientId, lastUpdate);
                const recordId = record._id;
                const patient = yield patient_1.default.findById(patientId);
                patient.records.push(recordId);
                yield patient.save();
                return patient;
            }
            catch (err) {
                throw new Error(`Error while trying to add a new record in patient ${patientId}`);
            }
        });
    }
    getPatientByCPF(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const standardCPF = cpf.replace(/\D/g, '');
                const patient = yield patient_1.default.findOne({ cpf: standardCPF })
                    .populate('address')
                    .populate('records')
                    .select('+cpf +cellNumber +records')
                    .exec();
                return patient;
            }
            catch (_a) {
                throw new Error(`A patient with CPF ${cpf} wasn't found.`);
            }
        });
    }
    getTotalPages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const total_patients = yield patient_1.default.find({}).count();
                return Math.ceil(total_patients / ELEM_PER_PAGE);
            }
            catch (err) {
                throw new Error('Error while counting total pages.');
            }
        });
    }
    listPatients(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientPage = yield patient_1.default.find({})
                    .select('+cpf')
                    .populate('records')
                    .populate('address')
                    .skip((ELEM_PER_PAGE * page) - ELEM_PER_PAGE)
                    .limit(ELEM_PER_PAGE);
                return patientPage;
            }
            catch (err) {
                throw new Error('Error while listing patients.');
            }
        });
    }
}
const patientService = PatientService.getInstance();
exports.default = patientService;
