const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader.split(" ")[1];
        const payLoad = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            userId: payLoad.userId,
            name: payLoad.name
        }
        next()
    }
    catch (err) {
        // next(err)
        res.send("error")
    }
}

module.exports = auth
