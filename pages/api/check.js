import urlCheck from '../../lib/urlCheck'

export default async function handler(req, res) {
  const result = await urlCheck(req.body.url)
  res.status(200).json(result)
}
