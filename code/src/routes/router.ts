import * as e from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator"

// Local imports //
import config from "../config"

import * as model from "../models/models"
import * as struct from "../models/models"
import * as val from "../validations/auth"

const jwtSecret = config.jwtSecret
const router: e.Router = e.Router()

// Test route //
router.get("/hello", (req: e.Request, res: e.Response) => {
    res.send("Hello world")
})

// User routes //

// Create user route //
// Registration //
router.post("/auth/reg", val.registration,  async (req: e.Request, res: e.Response): Promise<any> => {
    try {

    
        // Request validation //
        const valErrors = validationResult(req)
        if(!valErrors.isEmpty()) {
            return res.status(400).json(valErrors.array())
        }

        // If validation passed then create a new user //
        const body = req.body


        // We have to hash password //
        const password = body.password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)


        // Create a user instance //
        const user = model.User.build({
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            salt: passwordHash
        })

            await user.save()
        return res.status(200).json({
            success: true,
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
        })
    }


})

// This route is used to login created user //
router.post("/auth/login",val.auth, async (req: e.Request, res: e.Response): Promise<any> => { 
    // Request validation //
    const valErrors = validationResult(req)
    if(!valErrors.isEmpty()) {
        return res.status(400).json(valErrors.array())
    }

    let body = req.body

    // Generate jwt token with secret
    const token = jwt.sign({email: body.email}, jwtSecret)


    res.json({
        success: true,
        token,
    })
})

router.get("/user/getAll", async (req: e.Request, res: e.Response) => {
    const users = await model.User.findAll()

    res.json({
        users: users,
        success: true,
    })
})

// Update user route //
router.post("/user/update", (req: e.Request, res: e.Response) => {

})

// Make user admin //
router.post("/user/make/admin", (req: e.Request, res: e.Response) => {

})

// Make user donater //
router.post("/user/make/donater", (req: e.Request, res: e.Response) => {

})


// Remove user route //
router.post("/user/remove", (req: e.Request, res: e.Response) => {

})


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


export default router
