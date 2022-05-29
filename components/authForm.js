import { useState } from 'react'

export default function AuthForm({ error, type, onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function changeEmail(event) { setEmail(event.target.value) }
  function changePassword(event) { setPassword(event.target.value) }

  const [first, second] = type.split(' ')

  return (
    <div className='container mt-5'>
      <header className={`text-center container`}>
        <h1 className='boldest'>{first} <span className='text-danger'>{second}</span></h1>
      </header>
      <main className='d-flex justify-content-center'>
        <form className='d-flex flex-column my-5' onSubmit={onSubmit}>
          <input className='form-control noborder my-2' placeholder='Email' type='email' name='email' value={email} onChange={changeEmail} />
          <input className='form-control noborder my-2' placeholder='Password' type='password' name='password' value={password} onChange={changePassword} />
          <input className='btn btn-dark btn-md my-2' type='submit' value={type} />
          <div className='text-danger text-center mt-2'>{error}</div>
        </form>
      </main>
    </div>
  )
}