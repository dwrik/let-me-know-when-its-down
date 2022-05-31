import jwt from 'jsonwebtoken'
import User from '../models/user'

export default async function authCheck(req, res) {
  const { authorization } = req.headers
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    try {
      const decoded = jwt.verify(authorization.substring(7), process.env.SECRET)
      if (decoded) {
        req.user = await User.findById(decoded.id)
      }
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.status(400).json({ error: 'Session expired. Please login again!' })
      } else {
        res.status(400).json({ error: error.message })
      }
    }
  } else {
    res.status(401).json({ error: 'You are not authorized to perform this action!' })
  }
}