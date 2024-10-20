import * as e from "express"

import router from "./router"
import config from "../config"

const jwtSecret = config.jwtSecret

// Project routes //

// Create project route //
router.post("/project/create", (req: e.Request, res: e.Response) => {

})


// Organization routes //

// Create  organization route //
router.post("/organization/create", (req: e.Request, res: e.Response) => {

})

// Update organization route //
router.post("/organization/update", (req: e.Request, res: e.Response) => {

})

// Remove organization route //
router.post("/organization/remove", (req: e.Request, res: e.Response) => {

})
