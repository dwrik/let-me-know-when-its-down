import { useState } from 'react'
import AuthForm from '../components/authForm'

export default function SignIn() {
  const [error, setError] = useState(null)

  function logIn(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')

    // POST /api/login
    try {
      // on success, store jwt in state & localStorage
      // redirect to /dashboard
    } catch (error) {
      // on error show error message above sign up button
    }
  }

  return (
    <AuthForm error={error} type='Sign in' onSubmit={logIn} />
  )
}