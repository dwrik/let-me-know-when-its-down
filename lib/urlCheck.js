import axios from 'axios'

export default async function urlCheck(url) {
  try {
    const response = await axios.get(url, { timeout: 2500 })

    const {
      status,
      statusText,
      request: { host },
    } = response

    return {
      host,
      status,
      statusText,
    }
  } catch (error) {
    const {
      request,
      response,
    } = error

    const status = response ? response.status : null
    const statusText = response ? response.statusText : null
    const host = response ? response.config.url : request._currentUrl

    return {
      host,
      status,
      statusText,
    }
  }
}
