import * as e from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator"
import * as model from "../models/models" 
import jwtAuth from "../utils/auth"
import * as val from "../validations/user"
import config from "../config"

const jwtSecret = config.jwtSecret
const router = e.Router()
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
router.post("/auth/login", val.auth, async (req: e.Request, res: e.Response): Promise<any> => { 
    try {
        // Request validation //
        const valErrors = validationResult(req)
        if(!valErrors.isEmpty()) {
            return res.status(400).json(valErrors.array())
        }


        let body = req.body

        // Find one user by email /
        const user = await model.User.findOne({ where: { email: body.email } })
        if(!user) {
            return res.json({
                success:false
            }).status(404)
        }

        // Checking that provided password is valid //
        const isValidPass = await bcrypt.compare(body.password, user.getDataValue("salt"))
        if(!isValidPass) {
            return res.json({
                success: false
            }).status(404)
        }

        // Generate jwt token with secret
        const token = jwt.sign({id: body.email}, jwtSecret, { expiresIn: "15m" })


        return res.json({
            success: true,
            token,
        }).status(200)

    } catch(err) {
        return res.json({
            success:false
        }).status(500)
    }
})

router.get("/user/getAll", jwtAuth,  async (req: e.Request, res: e.Response) => {
    const users = await model.User.findAll()

    res.json({
        users: users,
        success: true,
    })
})

// Update user route //
router.put("/user/update/:id", val.update,  async (req: e.Request, res: e.Response): Promise<any> => {
        // Request validation //
        const valErrors = validationResult(req)
        if(!valErrors.isEmpty()) {
            return res.status(400).json(valErrors.array())
        }


        const body = req.body
        const id = req.param("id")
        
        const user = await model.User.findOne({ where: { id: id } })
        if(!user) {
            return res.json({
                success:false
            }).status(404)
        }
/*
        // Checking that provided password is valid //
        const isValidPass = await bcrypt.compare(body.password, user.getDataValue("salt"))
        if(!isValidPass) {
            return res.json({
                success: false
            }).status(404)
        }
*/
        
        if(body.email) {
            user.update({
                email: body.email
            })
        }
        if(body.firstName) {
            user.update({
                firstName: body.firstName
            })
        }
        if(body.lastName) {
            user.update({
                lastName: body.lastName
            })
        }
        if(body.password) {
            user.update({
                password: body.password
            })
        }

        await user.save()

        return res.json({
            success: true
        }).status(200)
})

// Make user admin //
router.post("/user/make/admin/", async (req: e.Request, res: e.Response): Promise<any> => {
    const body = req.body

    const user = await model.User.findByPk(body.userId)
    if(!user) {
        return res.json({
            success: false
        }).status(404)
    }

    const admin = model.Admin.build({
        userId: body.userId
    })
    await admin.save()
    
    return res.json({
        success: true
    }).status(200)

})


// This route is used to know what projects does admin manages //
router.get("/user/admin/:id/projects", async (req: e.Request, res: e.Response): Promise<any> => {
    const body = req.body
    const id = req.param("id")

    const projects = await model.AdminProject.findAll({
        where:{ userId: id }
    })

    if(!projects) {
        return res.json({
            success: false
        }).status(404)
    }

    return res.json({
        projects: projects,
        success: true
    }).status(200)

})

// Make user donater //
router.post("/user/make/donater/", async (req: e.Request, res: e.Response): Promise<any> => {
    const body = req.body

    const user = await model.User.findByPk(body.userId)
    if(!user) {
        return res.json({
            success: false
        }).status(404)
    }
    
    const userId = user.get("id")
    const donater = model.Donater.build({
        UserId: userId,
        money: 0
    })
    
    await donater.save()
 
    return res.json({
        success: true
    }).status(200)

})

// Get all user donations //
router.get("/user/donater/getAllDonations",  async (req: e.Request, res: e.Response): Promise<any> => {
   
    const body = req.body
    const donations = await model.HistoryDonations.findAll({where: { DonaterId: body.donaterId }})
    if(!donations) {
        return res.json({
            message: "not found",
            success: false
        }).status(404)
    }
    
    return res.json({
        donations: donations,
        success: false
    }).status(404)
})

router.get("/user/donater/getAll", val.donaterAddMoney, async (req: e.Request, res: e.Response): Promise<any> => {
    const donaters = await model.Donater.findAll()

    return res.json({
        donaters: donaters,
        success: false
    }).status(404)

})

router.post("/user/donater/addMoney", val.donaterAddMoney, async (req: e.Request, res: e.Response): Promise<any> => {
    // Request validation //
    const valErrors = validationResult(req)
    if(!valErrors.isEmpty()) {
        return res.status(400).json(valErrors.array())
    }

    const body = req.body
    const donater = await model.Donater.findByPk(body.donaterId)
    if(!donater) {
        return res.json({
            success: false
        }).status(404)
    }

    await donater.increment("money", { by: body.money })

    return res.json({
        success: true
    }).status(200)

})

// Remove user route //
router.delete("/user/remove/:id", async (req: e.Request, res: e.Response): Promise<any> => {
    const user = await model.User.findOne({ where: { id: req.param("id") } })

    if(!user) {
        return res.json({
            success: false
        }).status(404)
    }

    await user.destroy()

    return res.json({
        success: false
    }).status(200)
})

export default router
