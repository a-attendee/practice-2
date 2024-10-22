import * as val from "express-validator"

export const registration = [
    val.body("name").notEmpty().isString(),
    val.body("description").isString().optional(),
]

export const update = [
    val.body("name").notEmpty().isString().optional(),
    val.body("description").isString().optional(),
]

export const addAdmin = [
    val.body("organizationId").notEmpty().isNumeric(),
    val.body("adminId").notEmpty().isNumeric(),
]

