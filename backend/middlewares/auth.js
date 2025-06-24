const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Please Provide Token" })
        }

        const token = authHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({ success: false, message: "Please Provide Token" })
        }

        const decoded = jwt.verify(token, "secret") 
        req.user = decoded
        next()

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", description: error.message })
    }
}

module.exports = authMiddleware