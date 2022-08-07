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
router.post("/question3", middleware.authenticate, questionController.question_three)
router.post("/question4", middleware.authenticate, questionController.question_four)
router.post("/question5", middleware.authenticate, questionController.question_five)

module.exports=router