import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

// Extend the Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

const accessTokenSecret = config.jwtSecret

const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }

            req.user = user
            next()
        })
    } else {
        res.sendStatus(401)
    }
}

export default jwtAuth

