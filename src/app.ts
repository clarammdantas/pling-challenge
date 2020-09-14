import express from 'express';
import morgan from 'morgan';

class Application {
    app: express.Application;

    constructor() {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', process.env.PORT || 3000);
    }

    middlewares() {
        // HTTP request logger.
        this.app.use(morgan('dev'));
    }

    routes() {

    }

    start() {
        this.app.listen(this.app.get('port'), (err?: Error) => {
            if (err) {
                return console.log("Server can't run due to: ", err);
            }

            console.log("Server running on port: " + this.app.get('port'));
        });
    }
}

export default Application;
