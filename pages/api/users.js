import bcrypt from 'bcrypt'
import dbConnect from '../../lib/dbConnect'
import User from '../../models/user'

export default async function handler(req, res) {
  const { email, password } = req.body

  if (!(email && password)) {
    return res.status(400).json({
      error: 'Email or password missing'
    })
  }

  if (!(email.length > 3 && password.length > 5)) {
    return res.status(400).json({
      error: 'Email or password too short'
    })
  }

  await dbConnect()

  const existing = await User.findOne({ email })
  if (existing) {
    return res.status(400).json({
      error: 'Email already exists!'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ email, passwordHash })
  await user.save()

  res.status(201).json(user)
}