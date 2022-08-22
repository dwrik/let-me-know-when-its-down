import {sanitizeUrl} from '@braintree/sanitize-url'
import axios from 'axios'
import Link from 'next/link'
import normalizeUrl from 'normalize-url'
import {useState} from 'react'

import Result from '../components/result'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [website, setWebsite] = useState('')
  const [result, setResult] = useState(null)

  function changeWebsite(event) {
    setWebsite(event.target.value)
  }

  function checkWebsite(event) {
    event.preventDefault()

    try {
      const normalized = normalizeUrl(website, {
        forceHttps: true,
        stripHash: true,
        removeQueryParameters: true
      })

      const sanitized = sanitizeUrl(normalized)
      axios.post('/api/check', { url: sanitized })
        .then((response) => {
          setResult({ ...response.data })
        })

      setResult('Checking')
    } catch (error) {
      console.log(error)
      setResult(null)
    }
  }

  return (
    <div className='container'>
      <header className={`text-center container ${styles.titleContainer}`}>
        <h1 className={`${styles.title} boldest`}>
          Let Me Know<br />
          When It&apos;s<br />
          <span className='text-danger'>Down</span>
        </h1>
      </header>

      <main className='mt-5 d-flex flex-column align-items-center'>
        <p className='lead text-center'>
          Get notified when websites you rely on are down.<br />
          <Link href='/signup'>
            <a className='link-dark'>Sign up</a>
          </Link>{' '}
          to get notified or use the search bar below to check if it&apos;s down right now!
        </p>

        <form className='row mt-2'>
          <div className='input-group'>
            <input
              type='text'
              name='website'
              value={website}
              onChange={changeWebsite}
              placeholder='Enter a website to check...'
              className={`form-control form-control-lg noborder`}
            />
            <button className='btn btn-dark' type='submit' onClick={checkWebsite}>Check</button>
          </div>
        </form>

        {result ? <Result result={result} /> : null}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
