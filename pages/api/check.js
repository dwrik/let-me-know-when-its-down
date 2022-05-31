import urlCheck from '../../lib/urlCheck'

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case 'POST':
      const result = await urlCheck(req.body.url)
      res.status(200).json(result)
      break

    default:
      res.setHeader('Allow', 'POST')
      res.status(405).json({ error: `Method ${method} Not Allowed` })
  }
}
