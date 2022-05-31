import userExtract from '../../lib/userExtract'
import dbConnect from '../../lib/dbConnect'
import Website from '../../models/website'

export default async function handler(req, res) {
  const {
    body: { name, domain, url },
    method
  } = req

  await dbConnect()
  await userExtract(req, res)

  const { user } = req

  switch (method) {
    case 'GET':
      const websites = await Website.find({ users: user._id })
      res.status(200).json(websites)
      break

    case 'POST':
      if (!(name && domain && url)) {
        return res.status(400).json({
          error: 'invalid name, domain or host'
        })
      }

      const existing = await Website.findOne({ domain })

      const website = existing
        ? existing
        : new Website({ name, domain, url })

      const alreadyAdded = website.users.find((userId) => (
        userId.toString() === user._id.toString()
      ))

      if (alreadyAdded) {
        return res.status(400).json({
          error: 'Website already added!',
        })
      }

      website.users = website.users.concat(user._id)
      await website.save()

      user.websites = user.websites.concat(website._id)
      await user.save()

      res.status(201).json(website)
      break
    
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).json({ error: `Method ${method} Not Allowed` })
  }
}
