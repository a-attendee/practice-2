import * as e from "express"
import { validationResult } from "express-validator"

import * as model from "../models/models"
import * as projectVal from "../validations/project"

const router = e.Router()

// Donation route //
router.post("/project/donate",projectVal.donate, async (req: e.Request, res: e.Response): Promise<any> => {
    // Request validation //
    const valErrors = validationResult(req)
    if(!valErrors.isEmpty()) {
        return res.status(400).json(valErrors.array())
    }

    const body = req.body

    const donater = await model.Donater.findByPk(body.donaterId)
    
    if(!donater) {
        return res.json({
            message: "donater not found",
            success: false
        }).status(404)
    }

    const project = await model.Project.findByPk(body.projectId)

    if(!project) {
        return res.json({
            message: "project not found",
            success: false
        }).status(404)
    }

    const donaterMoney = Number(donater.get("money"))
    if(donaterMoney < body.money) {
        return res.json({
            message: "not enough money",
            success: false
        }).status(400)
    }

    const donaterId = donater.get("id")
    const projectId = donater.get("id")

    await model.HistoryDonations.create({ 
        DonaterId: donaterId,
        ProjectId: projectId,
        moneyDonated: body.money
    })

    await project.increment("actualMoneyRise", { by: body.money })
    await donater.decrement("money", { by: body.money })
    

    return res.json({
        success:true
    }).status(200)


})

// Get all projects //
router.get("/project/getAll", async (req: e.Request, res: e.Response): Promise<any> => {
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
router.get("/project/get/:id", async (req: e.Request, res: e.Response): Promise<any> => {
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

    const org = await model.Organization.findByPk(body.organizationId)
    if (!org) {
        return res.json({
            success: false
        }).status(404)
    }

    const orgId = org.get("id")

    const project = model.Project.build({
        name: body.name,
        description: body.description,
        expectedMoneyRise: body.expectedMoneyRise,
        actualMoneyRise: 0,
        startDate: body.startDate,
        endDate: body.endDate,
        status: body.status,
        OrganizationId: orgId
    })

    await project.save() 

    const projectId = project.get("id")

    await model.ProjectOrganization.create({ 
        ProjectId: projectId,
        OrganizationId: orgId 
    })


    return res.json({
        success:true
    }).status(200)
})

// This router adds feature: add organization to project //
router.post("/project/add/organization", projectVal.addOrganization, async (req: e.Request, res: e.Response): Promise<any> => {
    // Request validation //
    const valErrors = validationResult(req)
    if(!valErrors.isEmpty()) {
        return res.status(400).json(valErrors.array())
    }

    const body = req.body
    const project = await model.Project.findOne({
        where: { id: body. projectId }
    })

    if (!project) {
        return res.json({
            success: false
        }).status(404)
    }
    const org = await model.Organization.findOne({
        where: { id: body. organizationId }
    })

    if (!org) {
        return res.json({
            success: false
        }).status(404)
    }

    const link = model.ProjectOrganization.build({ 
        projectId: body.projectId,
        organizationId: body.organizationId
    })

    await link.save()


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
    if(body.startDate) {
        project.update({
            startDate: body.startDate
        })
    }
    if(body.endDate) {
        project.update({
            endDate: body.endDate
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

// This route is used to know what admins manag project//
router.get("/project/:id/admins/get", async (req: e.Request, res: e.Response): Promise<any> => {
    const id = req.param("id")

    const admins = await model.AdminProject.findAll({
        where:{ userId: id }
    })

    if(!admins) {
        return res.json({
            success: false
        }).status(404)
    }

    return res.json({
        admins: admins,
        success: true
    }).status(200)

})

// Remove project route //
router.delete("/project/remove/:id", async (req: e.Request, res: e.Response): Promise<any> => {
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

export default router
