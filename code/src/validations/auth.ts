import * as val from "express-validator"

export const registration = [
    val.body("email").isEmail(),
    val.body("firstName").isEmpty().isString(),
    val.body("lastName").isEmpty().isString(),
    val.body("password").notEmpty().isString().isLength({ min: 8, max: 30 })
]

export const auth = [
    val.body("email").isEmail(),
    val.body("password").notEmpty().isString().isLength({ min: 8, max: 30 })
]