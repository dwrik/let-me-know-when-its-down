import Link from 'next/link'
import { useRouter } from 'next/router'

function NavItem({ href, text, pathname}) {
  const isActive = pathname === href
  return (
    <li className='me-4 pb-2'>
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
  const navItems = ['', 'Sign up', 'Sign in']

  return (
    <nav className='d-flex justify-content-center justify-content-sm-end'>
      <ul className='list-unstyled d-flex justify-content-between pt-4 pe-0'>
        {navItems.map((item) => (
          <NavItem
            key={item}
            text={item}
            href={'/' + item.toLowerCase().replace(' ', '')}
            pathname={router.pathname}
          />
        ))}
      </ul>
    </nav>
  )
}