// console.log("Hello world") //

import bodyParser from "body-parser"
import * as e from "express"
import * as cors from "cors"

import repository from "./repository"
import router from "./routes/router"
import config from "./config"
//import * as dotenv from "dotenv"
//import * as models from "./models"

async function main() {
    const app = e.default()

    app.use(cors.default())
    app.use(e.json())
    app.use(bodyParser.json())

    // Add routes //
    app.use(router)

    // Connect to database //
    const db = repository
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');

        console.log('Sync models')
        await db.sync()

        console.log('All models has been synchronized successfully')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    // Set port from .env config //
    const port = config.serverPort

    // Start server //
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}


// Start everything //
main()
