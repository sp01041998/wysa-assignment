const mongoose = require("mongoose")


const question_Schema = new mongoose.Schema({
    nickName : {
        type : String
    },

    questions : {
        question1 : {
            type : String,
            default : null
        },

        question2 : {
            type : String,
            default : null
        },
        question3:{
            type : String,
            default : null
        },
        question4 : {
            type : String,
            default : null
        }
    }
}, {timestamps:true})

module.exports=mongoose.model('question', question_Schema)