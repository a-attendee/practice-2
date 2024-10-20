import * as val from "express-validator"

export const registration = [
    val.body("organizationId").notEmpty().isNumeric(),

    val.body("name").notEmpty().isString(),
    val.body("description").isString().optional(),
    val.body("expectedMoneyRise").isString().optional(),
    val.body("startingDate").isString(),
    val.body("endingDate").isString().optional(),
    val.body("status").isString().optional(),


    
]
export const update = [
    val.body("name").notEmpty().isString().optional(),
    val.body("description").isString().optional(),
    val.body("expectedMoneyRise").isString().optional(),
    val.body("startingDate").isDate().optional(),
    val.body("endingDate").isDate().optional(),
    val.body("status").isString().optional(),
]
