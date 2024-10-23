import * as e from "express"
import { validationResult } from "express-validator"

import * as model from "../models/models"
import * as orgVal from "../validations/organization"

const router = e.Router()

// Get all organizations //
router.get("/organization/getAll", async (req: e.Request, res: e.Response): Promise<any> => {
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
router.get("/organization/get/:id", async (req: e.Request, res: e.Response): Promise<any> => {
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

// Get all project related to organization //
router.get("/organization/get/projects", async (req: e.Request, res: e.Response): Promise<any> => {
    
    const body = req.body
    const projects = await model.ProjectOrganization.findAll({where: { OrganizationId: body.organizationId }})
    if(!projects) {
        return res.json({
            message: "not found",
            success: false
        }).status(404)
    }
    
    return res.json({
        projects: projects,
        success: false
    }).status(404)
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
router.put("/organization/update/:id", orgVal.update, async (req: e.Request, res: e.Response): Promise<any> => {
    // Request validation //
    const valErrors = validationResult(req)
    if(!valErrors.isEmpty()) {
        return res.status(400).json(valErrors.array())
    }

    const body = req.body
    const id = req.param("id")

    const org = await model.Organization.findOne({where: { id: id }})
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


// Organization should add admins to manage projects //
router.post("/organization/add/admin", orgVal.addAdmin, async (req: e.Request, res: e.Response): Promise<any> => {
    // Request validation //
    const valErrors = validationResult(req)
    if(!valErrors.isEmpty()) {
        return res.status(400).json(valErrors.array())
    }

    const body = req.body

    const org = await model.Organization.findByPk(body.organizationId)
    if(!org) {
        return res.json({
            success:false
        }).status(404)
    }
    const admin = await model.Admin.findByPk(body.adminId)
    if(!admin) {
        return res.json({
            success:false
        }).status(404)
    }

    const orgId = org.get("id")
    const adminId = admin.get("id")

    await model.AdminProject.create({ 
        OrganizationId: orgId,
        AdminId: adminId
    })



    return res.json({
        success: true
    }).status(200)
})

// Remove organization route //
router.delete("/organization/remove/:id", async (req: e.Request, res: e.Response): Promise<any> => {
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

export default router
