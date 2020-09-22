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
const express_1 = require("express");
// Service
const patientService_1 = __importDefault(require("../services/patientService"));
const patientRouter = express_1.Router();
patientRouter.route('/create')
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, cpf, sex, profession, cellNumber } = req.body;
        const address = req.body.address;
        const newPatient = yield patientService_1.default.createPatient(name, address, age, cpf, sex, profession, cellNumber);
        res.status(200).send(newPatient);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
patientRouter.route('/addRecord/:patientId')
    .patch((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentDate = new Date();
        const lastUpdate = new Date();
        const { annotations, prescription, } = req.body;
        const newRecord = yield patientService_1.default.addPatientRecord(req.params.patientId, appointmentDate, annotations, lastUpdate, prescription);
        res.status(200).send(newRecord);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
patientRouter.route('/edit/:patientId')
    .patch((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patientId = req.params.patientId;
        const patientToUpdate = req.body;
        const updatedPatient = yield patientService_1.default.editPatient(patientId, patientToUpdate);
        res.status(200).json(updatedPatient);
    }
    catch (err) {
        res.status(500).json({ err: err });
    }
}));
patientRouter.route('/delete/:patientId')
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield patientService_1.default.deletePatient(req.params.patientId);
        res.status(200).json({ "req_status": "obj deleted." });
    }
    catch (err) {
        res.status(500).json({ err: err });
    }
}));
patientRouter.route('/getByCPF/:cpf')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patient = yield patientService_1.default.getPatientByCPF(req.params.cpf);
        res.status(200).send(patient);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
patientRouter.route('/getTotalPages')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total_pages = yield patientService_1.default.getTotalPages();
        res.status(200).json({ total_pages: total_pages });
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
patientRouter.route('/list/:page')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.params.page);
        const patients = yield patientService_1.default.listPatients(page);
        res.status(200).send(patients);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.default = patientRouter;
