import { Router, Request, Response } from 'express';

// Service
import addressService from '../services/addressService';

// Types
import { AddressUpdate } from '../interfaces/IAddress';

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

addressRouter.route('/update/:addressId')
    .patch(async (req: Request, res: Response) => {
        try {
            const addressUpdate: AddressUpdate = req.body;
            const { addressId } = req.params;
            const uptadedAddress = await addressService.editAddress(addressId, addressUpdate);

            res.status(200).send(uptadedAddress);
        } catch (err) {
            res.status(500).send(err);
        }
    });

addressRouter.route('/get/:addressId')
    .get(async (req: Request, res: Response) => {
        try {
            const { addressId } = req.params;
            const address = await addressService.getAddress(addressId);

            res.status(200).send(address);
        } catch (err) {
            res.status(500).send(err);
        }
    });

export default addressRouter;
