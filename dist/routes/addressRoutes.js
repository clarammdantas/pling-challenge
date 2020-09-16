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
const addressService_1 = __importDefault(require("../services/addressService"));
const addressRouter = express_1.Router();
addressRouter.route('/create')
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { street, district, zipCode, number, complement } = req.body;
        const newAddress = yield addressService_1.default.createAddress(street, district, zipCode, number, complement);
        res.status(200).send(newAddress);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
addressRouter.route('/update/:addressId')
    .patch((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addressUpdate = req.body;
        const { addressId } = req.params;
        const uptadedAddress = yield addressService_1.default.editAddress(addressId, addressUpdate);
        res.status(200).send(uptadedAddress);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
addressRouter.route('/get/:addressId')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { addressId } = req.params;
        const address = yield addressService_1.default.getAddress(addressId);
        res.status(200).send(address);
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.default = addressRouter;
