const questionModel = require("../models/questionsSchema")
const jwt = require("jsonwebtoken")



const userInfo = async (req, res) => {
    try {

        const nickName = req.body

        if (nickName.length < 3) {
            return res.status(400).send({ status: false, msg: `nickName minimum length should be 3 , instead got ${nickName.length}` })
        }



        const userData = await questionModel.create(nickName)




        let token = jwt.sign({ id: userData._id }, "Daredevil")

        res.setHeader("Auth-api-token", token)
        let obj = {
            nickName: nickName.nickName,
            userId: userData._id,
            token: token
        }

        return res.status(200).send({ status: true, msg: "Nick Name submitted successfully, Pls proceed forward to next question", Data: obj })



    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



const question_one = async (req, res) => {
    try {

        let userAns = req.body.question


        let userId = req.decodeToken



        const userData = await questionModel.findOneAndUpdate(
            { _id: userId },
            { $set: { "questions.question1": userAns } },
            {new : true}
        )

        if (!userData) {
            return res.status(400).send({ status: false, msg: "First Provide your nickName" })
        }

        return res.status(200).send({ status: true, msg: "your answer submitted successfully. Now, pls go forward to next question", Data: userData })






    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



const question_two = async (req, res) => {
    try {

        let userAns = req.body.question_two.trim()
        const hours = userAns.slice(0, 2)
        const minutes = userAns.slice(2, 4)


        let userId = req.decodeToken
        console.log(userAns, userId)


        const userData = await questionModel.findOneAndUpdate(
            { _id: userId },
            { $set: { "questions.question2": userAns } },
            { new: true }
        )

        if (!userData) {
            return res.status(400).send({ status: false, msg: "First Provide your nickName" })
        }
        
        return res.status(200).send({ status: true, msg: "your answer submitted successfully. Now, pls go forward to next question", Data: userData })





    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

const question_three = async (req, res) => {
    try {

        let userAns = req.body.question_three.trim()
        

        let userId = req.decodeToken
        console.log(userAns, userId)


        const userData = await questionModel.findOneAndUpdate(
            { _id: userId },
            { $set: { "questions.question3": userAns } },
            { new: true }
        )

        if (!userData) {
            return res.status(400).send({ status: false, msg: "First Provide your nickName" })
        }
        
        return res.status(200).send({ status: true, msg: "your answer submitted successfully. Now, pls go forward to next question", Data: userData })





    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

const question_four = async (req, res) => {
    try {

        let userAns = req.body.question_four.trim()
        

        let userId = req.decodeToken
        console.log(userAns, userId)


        const userData = await questionModel.findOneAndUpdate(
            { _id: userId },
            { $set: { "questions.question4": userAns } },
            { new: true }
        )

        if (!userData) {
            return res.status(400).send({ status: false, msg: "First Provide your nickName" })
        }
        
        return res.status(200).send({ status: true, msg: "your answer submitted successfully. Now, pls go forward to next question", Data: userData })





    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}







module.exports = {
    userInfo,
    question_one,
    question_two,
    question_three,
    question_four
}