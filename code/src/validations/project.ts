import * as val from "express-validator"

export const registration = [
    val.body("organizationId").notEmpty().isNumeric(),

    val.body("name").notEmpty().isString(),
    val.body("description").isString().optional(),
    val.body("expectedMoneyRise").isNumeric(),
    val.body("startDate").isString(),
    val.body("endDate").isString().optional(),
    val.body("status").isString().optional(),


    
]
export const update = [
    val.body("name").notEmpty().isString().optional(),
    val.body("description").isString().optional(),
    val.body("expectedMoneyRise").isNumeric().optional(),
    val.body("startDate").isString().optional(),
    val.body("endDate").isString().optional(),
    val.body("status").isString().optional(),
]

export const addOrganization = [
    val.body("projectId").notEmpty().isNumeric(),
    val.body("organizationId").notEmpty().isNumeric(),
]

export const donate = [
    val.body("donaterId").notEmpty().isNumeric(),
    val.body("money").notEmpty().isNumeric(),
    val.body("projectId").notEmpty().isNumeric(),
]
