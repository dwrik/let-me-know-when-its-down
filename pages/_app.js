import Layout from '../components/layout'
import '../styles/globals.css'

const title = `Let Me Know When It's Down!`

function App({ Component, pageProps }) {
  return (
    <Layout title={title}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default App
