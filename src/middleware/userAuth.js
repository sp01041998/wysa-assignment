const jwt = require("jsonwebtoken")

let authenticate = async function (req, res, next) {
    try {
        let token = req.header("Auth-api-token")

        // check whether token is present in header or not
        if (!token) {
            return res.status(404).send({ status: false, msg: "token is not present in header" })
        }

        // decode the token and very its time stamp
        let decodeToken = jwt.verify(token, "Daredevil") 
        let exp = decodeToken.expiresIn
        let iatNow = Math.floor(Date.now() / 1000)
        if(exp<iatNow) {
            return res.status(401).send({status:false,msg:'Token is expired now'})

        }
        
        // extract the user id from token and set it in req object
        req.decodeToken = decodeToken.id
        next()

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.messge })
    }
}

module.exports.authenticate = authenticate