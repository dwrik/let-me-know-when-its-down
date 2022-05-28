import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Layout({ title, children }) {
  return (
    <div>
      <Navbar />
      <Head>
        <title>{title}</title>
        <meta name='description' content='Get notified when websites you rely on are down!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {children}
      <Footer />
    </div>
  )
}