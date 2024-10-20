import * as e from "express"
import { validationResult } from "express-validator"

import * as model from "../models/models"
import * as projectVal from "../validations/project"
import router from "./router"

// Get all projects //
router.post("/project/getAll", async (req: e.Request, res: e.Response): Promise<any> => {
    const projects = await model.Project.findAll()

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

// Get by project by id //

router.post("/project/get/:id", async (req: e.Request, res: e.Response): Promise<any> => {
    const paramId = req.param("id")
    if(!paramId) {
        return res.json({
            success: false
        }).status(400)
    }

    const project = await model.Project.findOne({where: { id: paramId }})
    if(!project) {
        return res.json({
            success: false
        }).status(404)
    }

    return res.json({
        success: true,
        project: project
    }).status(200)
})

// Create project route //
// Todo: add organization //
router.post("/project/create", projectVal.registration, async (req: e.Request, res: e.Response): Promise<any> => {
    // Request validation //
    const valErrors = validationResult(req)
    if(!valErrors.isEmpty()) {
        return res.status(400).json(valErrors.array())
    }

    const body = req.body

    const org = await model.Organization.findOne({ where: { id: body.organizationId } })

    const project = model.Project.build({
        name: body.name,
        description: body.description,
        expectedMoneyRise: body.expectedMoneyRise,
        actualMoneyRise: body.actualMoneyRise,
        startingDate: body.startingDate,
        endingDate: body.endignDate,
        status: body.status
    })
    
    await project.save()

    return res.json({
        success:true
    }).status(200)
})

// Update project route //
router.post("/project/update/:id", projectVal.update, async (req: e.Request, res: e.Response): Promise<any> => {
    // Request validation //
    const valErrors = validationResult(req)
    if(!valErrors.isEmpty()) {
        return res.status(400).json(valErrors.array())
    }

    const paramId = req.param("id")
    const body = req.body

    const project = await model.Project.findOne({ where: { id: paramId } })
    if (!project) {
        return res.json({
            success: false
        }).status(404)
    }

    if(body.name) {
        project.update({
            name: body.name
        })
    }
    if(body.description) {
        project.update({
            description: body.description
        })
    }
    if(body.expectedMoneyRise) {
        project.update({
            expectedMoneyRise: body.expectedMoneyRise
        })
    }
    if(body.actualMoneyRise) {
        project.update({
            actualMoneyRise: body.actualMoneyRise
        })
    }
    if(body.startingDate) {
        project.update({
            startingDate: body.startingDate
        })
    }
    if(body.endingDate) {
        project.update({
            endingDate: body.endingDate
        })
    }
    if(body.status) {
        project.update({
            status: body.status
        })
    }

    await project.save()

    return res.json({
        success:true
    }).status(200)
    
})

// Remove project route //
router.post("/project/remove/:id", async (req: e.Request, res: e.Response): Promise<any> => {
    const paramId = req.param("id")

    const project = await model.Project.findOne({ where: { id: paramId } })
    if(!project) {
        return res.json({
            success: false
        })
    }
    
    await project.destroy()

    return res.json({
        success: true
    }).status(200)
})


