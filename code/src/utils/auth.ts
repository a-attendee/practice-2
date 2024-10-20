import * as e from "express"
import jwt from "jsonwebtoken"
import config from "../config"
export default (req: e.Request, res: e.Response, next: e.NextFunction) => {
    const token = (req.headers.authorization || "").replace("/Bearer\s?", '')
    
    if (token) {
        try {
            const decoded = jwt.verify(token, config.jwtSecret)

            if(decoded) {
                next()
            }
        } catch(err) {
            return res.json({
                success:false
            }).status(403)
        }
    }
}
