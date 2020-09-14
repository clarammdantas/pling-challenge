"use strict";
// #! /usr/bin/env node
//
// console.log("This script populate some addresses to our db.");
//
// import async from "async";
// import mongoose from "mongoose";
// import Address from "./src/models/address";
//
// const MONGO_USERNAME = "admin";
// const MONGO_PASSWORD = "admin";
// const MONGO_HOSTNAME = "127.0.0.1";
// const MONGO_PORT = "27017";
// const MONGO_DB = "pling";
//
// const URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
// mongoose.connect(process.env.MONGODB_URL || URL, { useNewUrlParser: true });
//
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('connected', function() {
//     console.log("The db is connected.");
// });
// db.on('error', function() {
//     console.log("The db connection failed.");
// });
//
// const Address = mongoose.model('Address');
//
// const addresses = [];
//
// function addressCreate(street: string, district: string, zipCode: string,
//                        number: number, complement: string, cb: any) {
//     const address = new Address({
//         street: street,
//         district: district,
//         zipCode: zipCode,
//         number: number,
//         complement: complement
//     });
//
//     address.save(function(err) {
//         if (err) {
//             cb(err, null);
//             return;
//         }
//
//         console.log("New address: " + zipCode);
//         addresses.push(address);
//         cb(null, address);
//     });
// }
//
// function generateAddresses(cb) {
//     async.parallel([
//         function(callback) {
//             addressCreate("Street Amelia", "Tuna district", "58429010", 32, "Near to the lake", cb);
//         },
//         function(callback) {
//             addressCreate("Street Guinho", "Tuna district", "57660970", 23, "Near to the tree", cb);
//         },
//         function(callback) {
//             addressCreate("Street Maria", "Salmon district", "57660970", 25, "Near to the gym", cb);
//         },
//         function(callback) {
//             addressCreate("Street J", "Tilapia district", "57309646", 53, "Near to the waterfall", cb);
//         },
//         function(callback) {
//             addressCreate("Street UFCG", "Tilapia district", "57309646", 53, "Near to the uni");
//         },
//     ],
//     cb);
// }
//
// async.series([generateAddresses]);
