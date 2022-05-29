import { useEffect, useState } from 'react'
import UserContext from '../contexts/user'
import Layout from '../components/layout'
import '../styles/globals.css'

const title = `Let Me Know When It's Down!`

function App({ Component, pageProps }) {
  const [user, setUser] = useState({
    email: null,
    token: null,
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('lmkwid-token')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout title={title}>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  )
}

export default App
