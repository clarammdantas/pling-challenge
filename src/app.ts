import express from 'express';

class Application {
    app: express.Application;
    port: Number;

    constructor() {
        this.app = express();
        this.port = parseInt(<string>process.env.PORT, 10) || 3000;
    }

    start() {
        this.app.listen(this.port, (err?: Error) => {
            if (err) {
                return console.log("Server can't run due to: ", err);
            }

            console.log("Server running on port: " + this.port);
        });
    }
}

export default Application;
