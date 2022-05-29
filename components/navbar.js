import Link from 'next/link'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import userContext from '../contexts/user'

function NavItem({ href, text, pathname, index, array }) {
  const isActive = pathname === href
  return (
    <li className={`${index !== array.length - 1 ? 'me-4' : null } pb-2`}>
      <Link href={href}>
        <a className={`${isActive ? 'text-dark' : 'text-black-50'} text-decoration-none`}>
          {text ? text : 'Home'}
        </a>
      </Link>
    </li>
  )
}

export default function Navbar() {
  const router = useRouter()
  const { user, setUser } = useContext(userContext)

  function logoutUser() {
    setUser({ email: null, token: null })
    window.localStorage.removeItem('lmkwid-token')
    router.push('/')
  }

  if (user.token) {
    return (
      <div className='d-flex justify-content-end'>
        <button type='button' onClick={logoutUser} className='btn btn-link text-decoration-none text-secondary m-3'>
          Logout
        </button>
      </div>
    )
  }

  const navItems = ['', 'Sign up', 'Sign in']

  return (
    <nav className='d-flex justify-content-center justify-content-sm-end'>
      <ul className='list-unstyled d-flex m-4'>
        {navItems.map((item, index, array) => (
          <NavItem
            key={item}
            text={item}
            index={index}
            array={array}
            href={'/' + item.toLowerCase().replace(' ', '')}
            pathname={router.pathname}
          />
        ))}
      </ul>
    </nav>
  )
}