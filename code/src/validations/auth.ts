import * as val from "express-validator"

export const registration = [
    val.body("email").isEmail(),
    val.body("firstName").notEmpty().isString(),
    val.body("lastName").notEmpty().isString(),
    val.body("password").notEmpty().isString().isLength({ min: 8, max: 30 })
]

export const auth = [
    val.body("email").isEmail(),
    val.body("password").notEmpty().isString().isLength({ min: 8, max: 30 })
]

export const update = [
    val.body("email").isEmail().optional(),
    val.body("firstName").isString().optional(),
    val.body("lastName").isString().optional(),
    val.body("password").isString().isLength({ min: 8, max: 30 }).optional()
]
