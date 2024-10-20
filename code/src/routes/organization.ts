import * as e from "express"
import { validationResult } from "express-validator"

import router from "./router"
import * as model from "../models/models"
import * as orgVal from "../validations/organization"


// Get all organizations //
router.post("/organization/getAll", async (req: e.Request, res: e.Response): Promise<any> => {
    const org = await model.Organization.findAll()

    if(!org) {
        return res.json({
            success: false
        }).status(404)
    }

    return res.json({
        projects: org,
        success: true
    }).status(200)
})

// Get by organization by id //
router.post("/organization/get/:id", async (req: e.Request, res: e.Response): Promise<any> => {
    const paramId = req.param("id")
    if(!paramId) {
        return res.json({
            success: false
        }).status(400)
    }

    const org = await model.Organization.findOne({where: { id: paramId }})
    if(!org) {
        return res.json({
            success: false
        }).status(404)
    }

    return res.json({
        success: true,
        project: org
    }).status(200)
})


// Create  organization route //
router.post("/organization/create", orgVal.registration, async (req: e.Request, res: e.Response): Promise<any> => {
    // Request validation //
    const valErrors = validationResult(req)
    if(!valErrors.isEmpty()) {
        return res.status(400).json(valErrors.array())
    }

    const body = req.body
    const org = model.Organization.build({
        name: body.name,
        description: body.description
    })

    await org.save()
    return res.json({
        success:true
    }).status(200)
})

// Update organization route //
router.post("/organization/update/:name", orgVal.update, async (req: e.Request, res: e.Response): Promise<any> => {
    // Request validation //
    const valErrors = validationResult(req)
    if(!valErrors.isEmpty()) {
        return res.status(400).json(valErrors.array())
    }

    const body = req.body
    const oldName = req.param("oldName")

    const org = await model.Organization.findOne({where: { name: oldName }})
    if(!org) {
        return res.json({
            success:false
        }).status(404)
    }

    if(body.name) {
        org.update({
            name: body.name
        })
    }

    if(body.description) {
        org.update({
            name: body.description
        })
    }

    await org.save()


    return res.json({
        organization: org,
        success: true,
    })

})

// Remove organization route //
router.post("/organization/remove/:id", async (req: e.Request, res: e.Response): Promise<any> => {
    const paramId = req.param("id")
    if(!paramId) {
        return res.status(400)
    }

    const org = await model.Organization.findOne({ where: { id: paramId } })

    if(!org ) {
        return res.status(400)
    }
    
    await org.destroy()


    return res.json({
        success: true
    }).status(200)


})
