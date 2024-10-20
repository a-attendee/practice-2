import * as e from "express"

const router: e.Router = e.Router()


// Test route //
router.get("/hello", (req: e.Request, res: e.Response) => {
    res.send("Hello world")
})



export default router
