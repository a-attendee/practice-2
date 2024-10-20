import * as e from "express"

import router from "./router"
import config from "../config"

const jwtSecret = config.jwtSecret


// Project routes //

// Create project route //
router.post("/project/create", (req: e.Request, res: e.Response) => {

})

// Update project route //
router.post("/project/update", (req: e.Request, res: e.Response) => {

})

// Remove project route //
router.post("/project/remove", (req: e.Request, res: e.Response) => {

})


