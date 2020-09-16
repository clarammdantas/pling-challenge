"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const addressRoutes_1 = __importDefault(require("./routes/addressRoutes"));
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
class Application {
    constructor() {
        this.app = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', process.env.PORT || 3000);
    }
    middlewares() {
        // HTTP request logger.
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/address', addressRoutes_1.default);
        this.app.use('/patient', patientRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), (err) => {
            if (err) {
                return console.log("Server can't run due to: ", err);
            }
            console.log("Server running on port: " + this.app.get('port'));
        });
    }
}
exports.default = Application;
