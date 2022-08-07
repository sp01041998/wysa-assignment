const jwt = require("jsonwebtoken")

let authenticate = async function (req, res, next) {
    try {
        let token = req.header("Auth-api-token")
        if (!token) {
            return res.status(404).send({ status: false, msg: "token is not present in header" })
        }

       
        let decodeToken = jwt.verify(token, "Daredevil") 
        let exp = decodeToken.expiresIn
        let iatNow = Math.floor(Date.now() / 1000)
        if(exp<iatNow) {
            return res.status(401).send({status:false,msg:'Token is expired now'})

        }
       
        console.log(decodeToken)
        req.decodeToken = decodeToken.id
        next()

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.messge })
    }
}

module.exports.authenticate = authenticate