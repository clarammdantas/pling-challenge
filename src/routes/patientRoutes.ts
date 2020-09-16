import { Router, Request, Response } from 'express';

// Service
import patientService from '../services/patientService';

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

export default patientRouter;
