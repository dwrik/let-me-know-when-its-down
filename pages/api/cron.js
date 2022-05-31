import emailNotify from '../../lib/emailNotify'
import dbConnect from '../../lib/dbConnect'
import urlCheck from '../../lib/urlCheck'
import Website from '../../models/website'

export default async function handler(req, res) {
  const {
    headers: { authorization },
    method,
  } = req

  switch (method) {
    case 'POST':
      try {
        if (authorization !== `Bearer ${process.env.LMKWID_CRON_SECRET}`) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
      } catch (err) {
        return res.status(500).json({ statusCode: 500, message: err.message });
      }

      await dbConnect()

      const websites = await Website.find({}).populate('users', 'email')
      const mailingList = {}

      const promises = websites.map(({ url }) => urlCheck(url))
      const results = await Promise.allSettled(promises)

      for (let i = 0; i < results.length; i++) {
        const { status, statusText } = results[i].value

        if (status !== 200) {
          const { name, domain, url, users } = websites[i]

          const websiteStatus = {
            name,
            domain,
            url,
            status,
            statusText,
            lastChecked: new Date().toUTCString(),
          }

          for (const user of users) {
            mailingList[user.email] = mailingList[user.email] ?? []
            mailingList[user.email] = mailingList[user.email].concat(websiteStatus)
          }
        }
      }

      await emailNotify(mailingList)

      res.status(200).json({ success: true });
      break

    default:
      res.setHeader('Allow', 'POST');
      res.status(405).json({ error: `Method ${method} Not Allowed` })
  }
}