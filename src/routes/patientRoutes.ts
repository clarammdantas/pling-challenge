import { Router, Request, Response } from 'express';

// Service
import patientService from '../services/patientService';
import patientRecordService from '../services/patientRecordService';

// Types
import AddressModel from '../interfaces/IAddress';

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
            console.log(err);
            res.status(500).send(err);
        }
    });

export default patientRouter;
