import { useState } from 'react'

export default function AuthForm({ message, type, onSubmit }) {
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
          <input className='form-control noborder my-2' placeholder='Email' type='email' name='email' value={email} onChange={changeEmail} required />
          <input className='form-control noborder my-2' placeholder='Password' type='password' name='password' value={password} onChange={changePassword} required />
          <input className='btn btn-dark btn-md my-2' type='submit' value={type} />
          {message
            ? <div className={`text-${message.type === 'error' ? 'danger' : 'success'} text-center mt-2`}>
                {message.content}
              </div>
            : null
          }
        </form>
      </main>
    </div>
  )
}