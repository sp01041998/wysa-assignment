const express = require("express")

const router = express.Router()
const questionController = require("../controller/questionController")
const middleware = require("../middleware/userAuth")

router.get("/test-me", (req, res)=>{
    return res.send("Hello there")
})


router.post("/new/userInfo", questionController.userInfo)
router.post("/userLogin",  questionController.userLogin)

router.post("/question1/:userId", middleware.authenticate, middleware.authorise,  questionController.question_one)
router.post("/question2/:userId", middleware.authenticate,  middleware.authorise,     questionController.question_two)
router.post("/question3/:userId", middleware.authenticate,  middleware.authorise,  questionController.question_three)
router.post("/question4/:userId", middleware.authenticate,  middleware.authorise, questionController.question_four)
router.post("/question5/:userId", middleware.authenticate,  middleware.authorise, questionController.question_five)

module.exports=router