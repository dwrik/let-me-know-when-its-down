import { useState } from 'react'
import AuthForm from '../components/authForm'

export default function SignUp() {
  const [error, setError] = useState(null)

  function createAccount(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const email = formData.get('email')
    const password = formData.get('password')

    // POST /api/users
    try {
      // separate util to create user, login user, check website etc.

      // on success, POST /api/login with received user data
      // on success, store jwt in state & localStorage
      // redirect to /dashboard
    } catch (error) {
      // on error show error message above sign up button
    }
  }

  return (
    <AuthForm error={error} type='Sign up' onSubmit={createAccount} />
  )
}