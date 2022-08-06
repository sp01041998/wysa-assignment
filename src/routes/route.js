const express = require("express")

const router = express.Router()
const questionController = require("../controller/questionController")
const middleware = require("../middleware/userAuth")

router.get("/test-me", (req, res)=>{
    return res.send("Hello there")
})


router.post("/new/userInfo", questionController.userInfo)

router.post("/question1", middleware.authenticate, questionController.question_one)
router.post("/question2", middleware.authenticate, questionController.question_two)

module.exports=router