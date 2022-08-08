const questionModel = require("../models/questionsSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")



const userInfo = async (req, res) => {
    try {

        // extract the request body 
        const { nickName, userName, password } = req.body

        // if users name minimum length should be 3
        if (nickName.length < 3) {
            return res.status(400).send({ status: false, msg: `nickName minimum length should be 3 , instead got ${nickName.length}` })
        }

        //validate userName
        if (!/^[0-9a-zA-Z@$#]+$/.test(userName)) {
            return res.status(400).send({ status: false, msg: "The username is composed only of number, letter and @, $, # characters." })
        }

        //userName should be unique

        const checkUserName = await questionModel.findOne({userName : userName})
        if(checkUserName){
            return res.status(400).send({status : false, msg : `${userName} already exist`})
        }
        

        // password minimum length should be 8
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        if (!strongPassword.test(password)) {
            return res.status(400).send({ status: false, msg: "Your Password should contain at least one lowerCase letter, one upperCase letter, one digit, one special character and should be of minimum length 8" })
        }


        const securePassword = await bcrypt.hash(password, 10);

        // used to store userInfo
        let userObj = {
            nickName,
            userName,
            password : securePassword
        }

        
        // create a document in db with nickName
        const userData = await questionModel.create(userObj)


        // return the respond to the user
        return res.status(200).send({ status: true, msg: "Let's start by calculating sleep effiency and examining your concerns. Overtime we will work together to improve these", Data: userData })



    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


const userLogin = async function (req, res) {
    try {
        let {userName, password} = req.body
        
           //validate userName
        if (!/^[0-9a-zA-Z@$#]+$/.test(userName)) {
            return res.status(400).send({ status: false, msg: "The username is composed only of number, letter and @, $, # characters." })
        }

        // password minimum length should be 8
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        if (!strongPassword.test(password)) {
            return res.status(400).send({ status: false, msg: "Your Password should contain at least one lowerCase letter, one upperCase letter, one digit, one special character and should be of minimum length 8" })
        }
      


       
        const checkUserExist = await questionModel.findOne({ userName })
        if (!checkUserExist) {
            return res.status(401).send({ status: false, msg: "user does not exist in our system" })
        }

        let encodedPassword = checkUserExist.password

        const checkPassWord = await bcrypt.compare(password, encodedPassword)


        if (checkPassWord) {
            let token = jwt.sign(
                {userId: checkUserExist._id},"Daredevil")

            res.setHeader("Auth-api-token", token)
            res.status(200).send({ status: true, msg: "User login successful", data: { userId: checkUserExist._id, token: token } })

        } else {
            return res.status(401).send({ status: false, msg: "password is not correct" })
        }

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}




const question_one = async (req, res) => {
    try {


        // extract users ans from request body and user(Object id) from jwt token
        let userAns = req.body.question
        let userId = req.decodeToken

        // validate that ans is of correct format or not
        let correctAns = ["i would go to sleep easily", "i would sleep through the night", "i'd wake up on time, refreshed"]
        for (let i = 0; i < userAns.length; i++) {
            if (correctAns.indexOf(userAns[i].toLowerCase()) === -1) {
                return res.status(400).send({ status: false, msg: `${userAns[i]} :- is not acceptable answer . Pls provide any of these Answer ${[correctAns]}` })
            }
        }
        
        
        // update document in DB with answer of first question
        const userData = await questionModel.findOneAndUpdate(
            { _id: userId },
            { $set: { "questions.question1": userAns } },
            { new: true }
        )

       

        // this API will only work if users have provided his nickname in previous api
        if (!userData) {
            return res.status(400).send({ status: false, msg: "First Provide your nickName" })
        }

        return res.status(200).send({ status: true, msg: "That's Great Goal. Now, pls go forward to next question", Data: userData })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



const question_two = async (req, res) => {
    try {

        // extract users ans from request body
        let userAns = req.body.question_two

        // extract userid from JWt
        let userId = req.decodeToken


        // make sure that this api will only work after user have submitted the answer of previous questions
        const check = await questionModel.findOne({ _id: userId })
        if (!check.questions.question1) {
            return res.status(400).send({ status: false, msg: "Pls first reply on the previous questions" })
        }


        // update the document with 2nd answer
        const userData = await questionModel.findOneAndUpdate(
            { _id: userId },
            { $set: { "questions.question2": userAns } },
            { new: true }
        )


        return res.status(200).send({ status: true, msg: "your answer submitted successfully. Now, pls go forward to next question", Data: userData })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

const question_three = async (req, res) => {
    try {

        let userAns = req.body.question_three.trim()
        let userId = req.decodeToken


        // convert user bed time in 24-Hour format
        let timeIn_24Hour_format
        let bedTime = userAns.split(" ")
        if (bedTime[1] == "PM") {
            let hour = bedTime[0].split(":")[0]
            let minute = bedTime[0].split(":")[1]

            timeIn_24Hour_format = (12 + Number(hour)) + ":" + minute + ":00"


        } else {
            let hour = bedTime[0].split(":")[0]
            let minute = bedTime[0].split(":")[1]

            timeIn_24Hour_format = hour + ":" + minute + ":00"
        }


        // make sure that this api will only work after user have submitted the answer of previous questions
        const check = await questionModel.findOne({ _id: userId })
        if (!check.questions.question2) {
            return res.status(400).send({ status: false, msg: "Pls first reply on the previous questions" })
        }

        const userData = await questionModel.findOneAndUpdate(
            { _id: userId },
            { $set: { "questions.question3": timeIn_24Hour_format } },
            { new: true }
        )



        return res.status(200).send({ status: true, msg: "your answer submitted successfully. Now, pls go forward to next question", Data: userData })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



const question_four = async (req, res) => {
    try {

        let userAns = req.body.question_four
        let userId = req.decodeToken



        let timeIn_24Hour_format
        let bedTime = userAns.split(" ")
        if (bedTime[1] == "PM") {
            let hour = bedTime[0].split(":")[0]
            let minute = bedTime[0].split(":")[1]

            timeIn_24Hour_format = (12 + Number(hour)) + ":" + minute + ":00"


        } else {
            let hour = bedTime[0].split(":")[0]
            let minute = bedTime[0].split(":")[1]

            timeIn_24Hour_format = hour + ":" + minute + ":00"
        }




        // make sure that this api will only work after user have submitted the answer of previous questions
        const check = await questionModel.findOne({ _id: userId })
        if (!check.questions.question3) {
            return res.status(400).send({ status: false, msg: "Pls first reply on the previous questions" })
        }


        const userData = await questionModel.findOneAndUpdate(
            { _id: userId },
            { $set: { "questions.question4": timeIn_24Hour_format } },
            { new: true }
        )


        return res.status(200).send({ status: true, msg: "your answer submitted successfully. Now, pls go forward to next question", Data: userData })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}




const question_five = async (req, res) => {
    try {

        let userAns = req.body.question_five.trim()
        let userId = req.decodeToken


        // make sure that this api will only work after user have submitted the answer of previous questions
        const check = await questionModel.findOne({ _id: userId })
        if (!check.questions.question4) {
            return res.status(400).send({ status: false, msg: "Pls first reply on the previous questions" })
        }

        // update the usr document with last answer
        const userData = await questionModel.findOneAndUpdate(
            { _id: userId },
            { $set: { "questions.question5": userAns } },
            { new: true }
        )

        //calculate sleep efficiency

        const went_to_sleep = userData.questions.question3
        const wakeUpTime = userData.questions.question4

        const timeStart = new Date("01/01/2007 " + went_to_sleep);
        const timeEnd = new Date("01/02/2007 " + wakeUpTime);
        const totalTimeSpentInBed = Math.abs((timeEnd - timeStart) / (60 * 60 * 1000))  // calculated in hours


        const netSleepTime = userData.questions.question5.split(" ")[0]

        const sleepEfficiency = Math.round((netSleepTime / Number(totalTimeSpentInBed)) * 100)


        return res.status(200).send({ status: true, msg: `You seems to have sleep efficiency of ${sleepEfficiency > 100 ? 100 : sleepEfficiency}%. ${sleepEfficiency > 100 ? "That's Great" : "We will get it upto 100%"}` })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}




module.exports = {
    userInfo,
    userLogin,
    question_one,
    question_two,
    question_three,
    question_four,
    question_five
}