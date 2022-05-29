import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import AuthForm from '../components/authForm'

export default function SignUp() {
  const [message, setMessage] = useState(null)
  const router = useRouter()

  async function createAccount(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      await axios.post('/api/users', { email, password })
      setMessage({
        type: 'success',
        content: 'Sign up successful!',
      })
      setTimeout(() => {
        router.push('/signin')
      }, 2000)
    } catch (error) {
      setMessage({
        type: 'error',
        content: error.response.data.error,
      })
    }
  }

  return (
    <AuthForm message={message} type='Sign up' onSubmit={createAccount} />
  )
}