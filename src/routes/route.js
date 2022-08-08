const express = require("express")

const router = express.Router()
const questionController = require("../controller/questionController")
const middleware = require("../middleware/userAuth")


// user signup nd login api
router.post("/new/userInfo", questionController.userInfo)
router.post("/userLogin",  questionController.userLogin)


// questions api
router.post("/question1/:userId", middleware.authenticate, middleware.authorise,  questionController.question_one)
router.post("/question2/:userId", middleware.authenticate,  middleware.authorise,     questionController.question_two)
router.post("/question3/:userId", middleware.authenticate,  middleware.authorise,  questionController.question_three)
router.post("/question4/:userId", middleware.authenticate,  middleware.authorise, questionController.question_four)
router.post("/question5/:userId", middleware.authenticate,  middleware.authorise, questionController.question_five)

module.exports=router