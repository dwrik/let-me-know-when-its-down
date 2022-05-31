import SibApiV3Sdk from 'sib-api-v3-sdk'

export default async function emailNotify(mailingList) {
  SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SIB_API_KEY
  try {
    await new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail({
      'sender': {
        'name': `Let Me Know When It's Down`,
        'email': 'letmeknowwhenitsdown@gmail.com',
      },
      'subject': 'Services that you track might be down!',
      'htmlContent': '<html><body>This is the default htmlContent</body></html>',
      'messageVersions': getMessageVersions(mailingList),
    })
  } catch (error) {
    console.log(error)
  }
}

function getMessageVersions(mailingList) {
  const messageVersions = []
  for (const [email, websites] of Object.entries(mailingList)) {
    messageVersions.push({
      to: [{ email }],
      htmlContent: getHtmlContent(websites),
    })
  }
  return messageVersions
}

function getHtmlContent(websites) {
  const statuses = websites.map((website) => getWebsiteStatusHTML(website))
  return `
    <!DOCTYPE html>
    <html>
    <body>
      <p>
        Websites that you track are likely down.
        Below is a detailed rundown of the ones that might be down:
      </p>
      ${statuses.join('\n')}
    </body>
    </html>
  `
}

function getWebsiteStatusHTML(website) {
  return `
    <h2>${website.name}</h2>
    <ul>
      <li>Domain: ${website.domain}</li>
      <li>URL Checked: ${website.url}</li>
      <li>Status Code: ${website.status}</li>
      <li>Status Text: ${website.statusText}</li>
      <li>Last Checked: ${website.lastChecked}</li>
    </ul>
  `
}
