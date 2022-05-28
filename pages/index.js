import axios from 'axios'
import Link from 'next/link'
import normalizeUrl from 'normalize-url'
import { sanitizeUrl } from '@braintree/sanitize-url'
import { useState } from 'react'

import Result from '../components/result'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [domain, setDomain] = useState('')
  const [result, setResult] = useState(null)

  function changeDomain(event) {
    setDomain(event.target.value)
  }

  function checkDomain(event) {
    event.preventDefault()
    try {
      const sanitized = sanitizeUrl(domain)
      const normalized = normalizeUrl(sanitized, { forceHttps: true })
      axios.get(`/api/check?domain=${normalized}`)
        .then((response) => {
          setResult({ ...response.data })
        })
      console.log('finished')
      setResult('Checking')
    } catch (error) {
      console.log(error)
      setResult(null)
    }
  }

  return (
    <div className='container outer-container'>
      <header className={`text-center container ${styles.titleContainer}`}>
        <h1 className={`${styles.title} ${styles.boldest}`}>
          Let Me Know<br />
          When It&apos;s<br/>
          <span className='text-danger'>Down</span>
        </h1>
      </header>

      <main className='mt-5 d-flex flex-column align-items-center'>
        <p className='lead text-center'>
          Get notified when websites you use are down.<br />
          <Link href='/signup'>
            <a className='link-dark'>Sign up</a>
          </Link>{' '}
          to get notified or use the search bar below to check if it&apos;s down right now!
        </p>

        <form className='row mt-2'>
          <div className='input-group'>
            <input
              type='text'
              name='domain'
              value={domain}
              onChange={changeDomain}
              placeholder='Enter a domain to check...'
              className={`form-control form-control-lg ${styles.noborder}`}
            />
            <button className='btn btn-dark' type='submit' onClick={checkDomain}>Check</button>
          </div>
        </form>

        {result ? <Result result={result} /> : null}

        {/* <h2 className={`mt-5 ${styles.boldest}`}>Top Websites</h2> */}
      </main>
    </div>
  )
}
