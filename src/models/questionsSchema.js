const mongoose = require("mongoose")


const question_Schema = new mongoose.Schema({
    nickName : {
        type : String
    },

    userName : {
        type : String,
        unique : true
    }, 
    password : {
        type : String
    },

    questions : {
        question1 : {
            type : [String]
        },

        question2 : {
            type : String,
            enum : ["less than 2 weeks", "2 to 8 weeks", "More than 8 weeks"]
        },

        question3:{
            type : String,
        },

        question4 : {
            type : String,
        },

        question5 : {
            type : String
        }
    }
}, {timestamps:true})

module.exports=mongoose.model('question', question_Schema)