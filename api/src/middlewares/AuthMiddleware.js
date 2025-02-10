const jwt = require('jsonwebtoken')

const AuthMiddleware = (req,res,next) => {
    let token = req.cookies.jwt
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (error,decodeValue) => {
            if(error) {
                return res.status(401).json({ message : 'Unauthenticated Token' })
            } else {
                // To-Do: Confirm request user with decodeValue
                next()
            }
        })
    } else {
        return res.status(400).json({ message : 'token need to be provided' })
    }
}

module.exports = AuthMiddleware