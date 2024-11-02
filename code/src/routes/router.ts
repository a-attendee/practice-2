import * as e from "express"

import user from "./user"
import project from "./project"
import organization from "./organization"
import report from "./report"

const router: e.Router = e.Router()


// Test route //
router.get("/hello", (req: e.Request, res: e.Response) => {
    res.send("Hello world")
})


router.use('/', user)
router.use('/', project)
router.use('/', organization)
router.use('/', report)

export default router
