import { Router, Request, Response } from 'express';

// Service
import addressService from '../services/addressService';

const addressRouter = Router();

addressRouter.route('/create')
    .post(async (req: Request, res: Response) => {
        try {
            const {
                street,
                district,
                zipCode,
                number,
                complement
            } = req.body;
            const newAddress = await addressService.createAddress(street, district, zipCode,
                                                                  number, complement);

            res.status(200).send(newAddress);
        } catch (err) {
            res.status(500).send(err);
        }
    });

export default addressRouter;
