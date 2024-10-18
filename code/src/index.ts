// console.log("Hello world") //

import * as e from "express"
import repository from "./repository"
//import * as models from "./models"

async function main() {
    const app = e.default()
    const db = repository
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        console.log('Sync models')
        await db.sync({ force: true })
        console.log('All models has been synchronized successfully')
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    const port = 3000

    app.get('/', (req:e.Request, res: e.Response) => {
        req.body
        res.send('Hello World!')
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

main()
