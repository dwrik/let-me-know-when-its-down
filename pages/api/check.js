import axios from 'axios'

export default async function handler(req, res) {
  try {
    const response = await axios.get(req.body.url, { timeout: 10000 })
    res.status(200).json({
      status: response.status,
      statusText: response.statusText,
      host: response.request.host,
    })
  } catch ({ request, response }) {
    const status = response ? response.status : null
    const statusText = response ? response.statusText : null
    const host = response ? response.config.url : request._currentUrl
    res.status(200).json({ status, statusText, host })
  }
}
