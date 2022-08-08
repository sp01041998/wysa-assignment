# wysa-assignment

## Project - Backend Developer Mini Project(Sleep App flow)

### Key points
- Create a  database `wysa-Assignment`. MongoDB Url = "mongodb+srv://sp01041998:71HOQkRVAWXnVxw0@cluster0.deqvc.mongodb.net/wysa-Assignment"(use this url to connect with my db)
- Have tested entire api on postman

### Models
- Question Model
```yaml
{ 
  name: {string},
  question : {
  question1 : {type:[String]},
  question2 : {type : String ,  enum : ["less than 2 weeks", "2 to 8 weeks", "More than 8 weeks"]},
  question3 : {type : String},
  question4 : {type : String},
  question5 : {type : String}
  createdAt: {timestamp},
  updatedAt: {timestamp}
}
```


## User APIs 
### POST /new/userInfo
-Take nickName, userName and password as a input from the user and create a document in dataBase.Data at this point should look like [this](#document structure)
- used bcrypt to hash the password
- user document Object id(User id) to create JWT token
- Return HTTP status 200 on a succesful nickName submission.The response should be a JSON object like [this](#Response structure)\


### POST /userLogin
- take userName and Passowrd as input from the user
- if any details provided by user is wrong, then res the user that "userName/password is wrong".\
- use userId(Object id) to generate JWT token
- Return HTTP status 200 on a succesful login.

### POST /question1/:userId
- User will hit this api to sub,it the answer of first question
- Extract response of user from req body
- Extract JWT Token from header and authenticate it.After successful decoding of token , extract userID from it.
- make sure that user have alreday submitted his nickName name in previous API
- use this userID to update Document with user response of 1st Question

### POST /question2/:userId
- User will hit this api to submit the answer of second question
- Extract response of user from req body
- Extract JWT Token from header and authenticate it.After successful decoding of token , extract userID from it.
- make sure this api will only be hit when user have already responded on previous questions
- use this userID to update Document with user response of 2nd Question

###  POST /question3/:userId
- User will hit this api to submit the answer of third question
- Extract response of user from req body
- Extract JWT Token from header and authenticate it.After successful decoding of token , extract userID from it.
- make sure this api will only be hit when user have already responded on previous questions
- user will give time as a input in response to our Question, Convert that time in 24-Hour format before updating the document
- use this userID to update Document with user response of 3rd question


###  POST /question4/:userId
- User will hit this api to submit the answer of 4th question
- Extract response of user from req body
- Extract JWT Token from header and authenticate it.After successful decoding of token , extract userID from it.
- make sure this api will only be hit when user have already responded on previous questions
- user will give time as a input in response to our Question, Convert that time in 24-Hour format before updating the document
- use this userID to update Document with user response of 4th question

###  POST /question5/:userId
- User will hit this api to submit the answer of 4th question
- Extract response of user from req body
- Extract JWT Token from header and authenticate it.After successful decoding of token , extract userID from it.
- make sure this api will only be hit when user have already responded on previous questions
- calculate sleep efficieny.
- use this userID to update Document with user response of 4th question
- resond back to user with sleep efficiency of user


### Authentication
- used JWT to authenticate the user

### Authorisation
- used decoded token informtion to authorise our user
- this will make sure that all api are endpoint protected

## Response

### document structure
```yaml
{
  {
  "_id": ObjectId("62ef5dcba0b378ed1ce2766d"),
  "nickName": "Dhoni",
  "userName" : "sp0104002",
  "password" : "$2b$10$2rW9nhDJpeFGVb.tZKygdObXIPsv0Ui4KQ0QDAs2rvEdG7bYjxe9i"
  "questions": {
    "question1": [
      "I would go to sleep easily",
      "I'd wake up on time, refreshed"
    ],
    "question2": "2 to 8 weeks",
    "question3": "20:00:00",
    "question4": "09:00:00",
    "question5": "5 hr"
  },
  "createdAt": 2022-08-07T10:52:29.866+00:00,
  "updatedAt": 2022-08-07T10:52:29.866+00:00,
  "__v": 0
}
}
```
### Response structure
```yaml
{
  status: true,
  message: "Let's start by calculating sleep effiency and examining your concerns. Overtime we will work together to improve these"
  Data : {
    "nickName": "Rohit",
    "userId": "62ef9a126414fa15e2a34b90",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZWY5YTEyNjQxNGZhMTVlMmEzNGI5MCIsImlhdCI6MTY1OTg2OTcxNH0.ourZIdY-78SImhNMRNk3rDwrQjfCo8X-uTQ6HXHjBvQ"}
}
```
### Note(Assumption)
- wakeuptime and sleeptime of user will be on consecutive day, eg: sleepTime : - "08:30m PM"(01/08/2022) so bedtime needs to on next day (bedTime : - anytime om (02/08/2022)
- this is assumed to calculate sleep efficieny

