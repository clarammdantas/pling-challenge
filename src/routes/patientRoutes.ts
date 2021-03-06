import { Router, Request, Response } from 'express';

// Service
import patientService from '../services/patientService';

// Types
import AddressModel from '../interfaces/IAddress';
import IPatientUpdate from '../interfaces/IPatient'

const patientRouter = Router();

patientRouter.route('/create')
    .post(async (req: Request, res: Response) => {
        try {
            const {
                name,
                age,
                cpf,
                sex,
                profession,
                cellNumber
            } = req.body;
            const address: AddressModel = req.body.address;

            const newPatient = await patientService.createPatient(name, address, age,
                                                                  cpf, sex, profession,
                                                                  cellNumber);

            res.status(200).send(newPatient);
        } catch (err) {
            res.status(500).send(err);
        }
    });

patientRouter.route('/addRecord/:patientId')
    .patch(async (req: Request, res: Response) => {
        try {
            const appointmentDate = new Date();
            const lastUpdate = new Date();

            const {
                annotations,
                prescription,
            } = req.body;

            const newRecord = await patientService.addPatientRecord(req.params.patientId,
                                                                    appointmentDate,
                                                                    annotations,
                                                                    lastUpdate,
                                                                    prescription);
            res.status(200).send(newRecord);
        } catch (err) {
            res.status(500).send(err);
        }
    });

patientRouter.route('/edit/:patientId')
    .patch(async (req: Request, res: Response) => {
        try {
            const patientId = req.params.patientId;
            const patientToUpdate: IPatientUpdate = req.body;
            const updatedPatient = await patientService.editPatient(patientId, patientToUpdate);

            res.status(200).json(updatedPatient);
        } catch (err) {
            res.status(500).json({err: err});
        }
    })

patientRouter.route('/delete/:patientId')
    .delete(async (req: Request, res: Response) => {
        try {
            await patientService.deletePatient(req.params.patientId);

            res.status(200).json({"req_status": "obj deleted."});
        } catch (err) {
            res.status(500).json({err: err});
        }
    })

patientRouter.route('/getByCPF/:cpf')
    .get(async (req: Request, res: Response) => {
        try {
            const patient = await patientService.getPatientByCPF(req.params.cpf);

            res.status(200).send(patient);
        } catch (err) {
            res.status(500).send(err);
        }
    });

patientRouter.route('/getTotalPages')
    .get(async (req: Request, res: Response) => {
        try {
            const total_pages = await patientService.getTotalPages();

            res.status(200).json({total_pages: total_pages});
        }  catch (err) {
            res.status(500).send(err);
        }
    })

patientRouter.route('/list/:page')
    .get(async (req: Request, res: Response) => {
        try {
            const page = Number(req.params.page);
            const patients = await patientService.listPatients(page);

            res.status(200).send(patients);
        } catch (err) {
            res.status(500).send(err);
        }
    });

export default patientRouter;
