# wysa-assignment

## Project - Backend Developer Mini Project(Sleep App flow)

### Key points
- Create a  database `wysa-Assignment`. MongoDB Url = "mongodb+srv://sp01041998:71HOQkRVAWXnVxw0@cluster0.deqvc.mongodb.net/wysa-Assignment"(use this url to connect with my db)
-Have tested entire api on postman

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
-Take nickNme as a input from the user and create a document in dataBase.Data at this point should look like [this](#document structure)
- user document Object id(User id) to create JWT token
- Return HTTP status 200 on a succesful nickName submission.The response should be a JSON object like [this](#successful-response-structure)

### POST /question1
- User will hit this api to sub,it the answer of first question
- Extract response of user from req body
- Extract JWT Token from header and authenticate it.After successful decoding of token , extract userID from it.
- make sure that user have alreday submitted his nickName name in previous API
- use this userID to update Document with user response of 1st Question

### POST /question2
- User will hit this api to submit the answer of second question
- Extract response of user from req body
- Extract JWT Token from header and authenticate it.After successful decoding of token , extract userID from it.
- make sure this api will only be hit when user have already responded on previous questions
- use this userID to update Document with user response of 2nd Question

###  POST /question3
- User will hit this api to submit the answer of third question
- Extract response of user from req body
- Extract JWT Token from header and authenticate it.After successful decoding of token , extract userID from it.
- make sure this api will only be hit when user have already responded on previous questions
- user will give time as a input in response to our Question, Convert that time in 24-Hour format before updating the document
- use this userID to update Document with user response of 3rd question


###  POST /question4
- User will hit this api to submit the answer of 4th question
- Extract response of user from req body
- Extract JWT Token from header and authenticate it.After successful decoding of token , extract userID from it.
- make sure this api will only be hit when user have already responded on previous questions
- user will give time as a input in response to our Question, Convert that time in 24-Hour format before updating the document
- use this userID to update Document with user response of 4th question

###  POST /question5
- User will hit this api to submit the answer of 4th question
- Extract response of user from req body
- Extract JWT Token from header and authenticate it.After successful decoding of token , extract userID from it.
- make sure this api will only be hit when user have already responded on previous questions
- calculate sleep efficieny.
- use this userID to update Document with user response of 4th question
- resond back to user with sleep efficiency of user


### PUT /books/:bookId
- Update a book by changing its
  - title
  - excerpt
  - release date
  - ISBN
- Make sure the unique constraints are not violated when making the update
- Check if the bookId exists (must have isDeleted false and is present in collection). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)
- Return an HTTP status 200 if updated successfully with a body like [this](#successful-response-structure) 
- Also make sure in the response you return the updated book document. 

### DELETE /books/:bookId
- Check if the bookId exists and is not deleted. If it does, mark it deleted and return an HTTP status 200 with a response body with status and message.
- If the book document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure) 

## Review APIs
### POST /books/:bookId/review
- Add a review for the book in reviews collection.
- Check if the bookId exists and is not deleted before adding the review. Send an error response with appropirate status code like [this](#error-response-structure) if the book does not exist
- Get review details like review, rating, reviewer's name in request body.
- Update the related book document by increasing its review count
- Return the updated book document with reviews data on successful operation. The response body should be in the form of JSON object like [this](#successful-response-structure)

### PUT /books/:bookId/review/:reviewId
- Update the review - review, rating, reviewer's name.
- Check if the bookId exists and is not deleted before updating the review. Check if the review exist before updating the review. Send an error response with appropirate status code like [this](#error-response-structure) if the book does not exist
- Get review details like review, rating, reviewer's name in request body.
- Return the updated book document with reviews data on successful operation. The response body should be in the form of JSON object like [this](#book-details-response)

### DELETE /books/:bookId/review/:reviewId
- Check if the review exist with the reviewId. Check if the book exist with the bookId. Send an error response with appropirate status code like [this](#error-response-structure) if the book or book review does not exist
- Delete the related reivew.
- Update the books document - decrease review count by one

### Authentication
- Make sure all the book routes are protected.

### Authorisation
- Make sure that only the owner of the books is able to create, edit or delete the book.
- In case of unauthorized access return an appropirate error message.

## Testing 
- To test these apis create a new collection in Postman named Project 4 Books Management 
- Each api should have a new request in this collection
- Each request in the collection should be rightly named. Eg Create user, Create book, Get books etc
- Each member of each team should have their tests in running state

Refer below sample
 ![A Postman collection and request sample](assets/Postman-collection-sample.png)

## Response

### document structure
```yaml
{
  status: true,
  message: 'Success',
  data: {

  }
}
```
### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```

