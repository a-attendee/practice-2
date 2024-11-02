import * as e from "express"
import * as excelJs from "exceljs"
import * as model from "../models/models"

const router = e.Router()


// Get excel report about all exsisting organization projects //
router.get("/organization/getAll/report", async (req, res) => {
    const org = await model.Organization.findAll({
        include: {
            model: model.Project
        },
    })    

    if(!org) {
        return res.json({
            success: false
        }).status(404)
    }


    const projects = org[0].getDataValue("Projects")

    if(!projects) {
        return res.json({
            success: false
        }).status(500)
    }


    let workbook = new excelJs.Workbook()

    const sheet = workbook.addWorksheet("report") 

    sheet.columns = [
        { header: "Name", key: "name", width: 25 },
        { header: "Description", key: "description", width: 50 },
        { header: "Expected Money Rise", key: "expectedMoneyRise", width: 50 },
        { header: "Current Status", key: "status", width: 25 },
    ]

    projects.map((value, idx) => {
        sheet.addRow({
            name: value.name,
            description: value.description,
            expectedMoneyRise: value.expectedMoneyRise,
            status: value.status
        })
    })

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )

    res.setHeader(
        "Content-Disposition",
        "attachment;filename=" + "report.xlsx"
    )

    workbook.xlsx.write(res)

})

export default router
