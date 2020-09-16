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
const patientRecord_1 = __importDefault(require("../models/patientRecord"));
class PatientRecordService {
    constructor() { }
    static getInstance() {
        if (!PatientRecordService.instance) {
            PatientRecordService.instance = new PatientRecordService();
        }
        return PatientRecordService.instance;
    }
    createPatientRecord(appointmentDate, annotations, prescription, patientId, lastUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patientRecord = new patientRecord_1.default({ appointmentDate,
                    annotations,
                    prescription,
                    lastUpdate,
                    patient: patientId });
                yield patientRecord.save();
                return patientRecord;
            }
            catch (err) {
                throw new Error(`Error while trying to create a new patient record. Details: ${err}`);
            }
        });
    }
}
const patientRecordService = PatientRecordService.getInstance();
exports.default = patientRecordService;
