import dbConnect from '../../../lib/dbConnect'
import userExtract from '../../../lib/userExtract'
import Website from '../../../models/website'

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req

  await dbConnect()
  await userExtract(req, res)

  switch (method) {
    case 'DELETE':
      const { user } = req
      const website = await Website.findById(id)

      if (!(user && website)) {
        return res.status(400).json({
          error: 'Invalid user or website'
        })
      }

      const owned = website.users.find((associated) => (
        associated._id.toString() === user._id.toString()
      ))

      if (!owned) {
        return res.status(401).json({
          error: 'You are not authorized to perform this operation!'
        })
      }

      user.websites = user.websites.filter((websiteId) => websiteId.toString() !== id)
      await user.save()

      website.users = website.users.filter((userId) => userId.toString() !== user._id.toString())
      website.users.length === 0
        ? await Website.findByIdAndDelete(id)
        : await website.save()

      res.status(204).end()
      break

    default:
      res.setHeader('Allow', ['DELETE'])
      res.status(405).json({ error: `Method ${method} Not Allowed` })
  }
}