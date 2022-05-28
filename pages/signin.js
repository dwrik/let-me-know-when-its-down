import Link from 'next/link'

export default function SignIn() {
  return (
    <div>
      <h1>Sign In</h1>
      <Link href='/signup'>
        <a>Sign Up</a>
      </Link>
    </div>
  )
}