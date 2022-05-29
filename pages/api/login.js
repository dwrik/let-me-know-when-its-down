import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dbConnect from '../../lib/dbConnect'
import User from '../../models/user'

export default async function handler(req, res) {
  const { email, password } = req.body

  await dbConnect()

  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid email or password'
    })
  }

  const userForToken = {
    email: user.email,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })
  res.status(200).json({
    email: user.email,
    token: token,
  })
}