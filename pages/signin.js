import axios from 'axios'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import AuthForm from '../components/authForm'
import userContext from '../contexts/user'

export default function SignIn() {
  const [message, setMessage] = useState(null)
  const { setUser } = useContext(userContext)
  const router = useRouter()

  async function logIn(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await axios.post('/api/login', { email, password })
      console.log(response)

      window.localStorage.setItem(
        'lmkwid-token', JSON.stringify(response.data)
      )

      router.push('/dashboard')
      setUser(response.data)
      setMessage(null)
    } catch (error) {
      setMessage({
        type: 'error',
        content: error.response.data.error,
      })
    }
  }

  return (
    <AuthForm message={message} type='Sign in' onSubmit={logIn} />
  )
}