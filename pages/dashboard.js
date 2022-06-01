import { parse } from 'tldts'
import { useContext, useEffect, useState } from 'react'
import { sanitizeUrl } from '@braintree/sanitize-url'
import normalizeUrl from 'normalize-url'
import axios from 'axios'
import userContext from '../contexts/user'
import Websites from '../components/websites'

export default function Dashboard() {
  const [websites, setWebsites] = useState([])
  const [message, setMessage] = useState(null)
  const [URL, setURL] = useState('')
  const { user } = useContext(userContext)

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }

    if (user.token) {
      axios.get('/api/websites', config)
        .then((response) => {
          setWebsites(response.data)
          setMessage(null)
        })
        .catch((error) => {
          console.log(error)
          setMessage({
            type: 'error',
            content: error.response.data.error,
          })
        })
    }
  }, [user.token])

  function addWebsite(event) {
    event.preventDefault()
    console.log(URL)

    const normalized = normalizeUrl(URL, {
      forceHttps: true,
      stripHash: true,
      removeQueryParameters: true,
    })
    const sanitized = sanitizeUrl(
      normalized
    )
    const {
      domainWithoutSuffix: dws,
      domain
    } = parse(sanitized)

    if (dws === null) {
      return setMessage({
        type: 'error',
        content: 'Invalid url',
      })
    }

    const name = dws[0].toUpperCase() + dws.substring(1)

    const website = {
      name,
      domain,
      url: sanitized
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }

    axios.post('/api/websites', website, config)
      .then((response) => {
        const saved = response.data
        console.log(saved)
        setWebsites(websites.concat(saved))
        setMessage(null)
        setURL('')
      })
      .catch((error) => {
        console.log(error)
        setMessage({
          type: 'error',
          content: error.response.data.error,
        })
      })
  }

  function deleteWebsite(event) {
    const id = event.target.parentNode.parentNode.id

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }

    axios.delete(`/api/websites/${id}`, config)
      .then(() => {
        setWebsites(websites.filter((website) => website.id !== id))
        setMessage(null)
      })
      .catch((error) => {
        console.log(error)
        setMessage({
          type: 'error',
          content: error.response.data.error,
        })
      })
  }

  function changeURL(event) {
    setURL(event.target.value)
    setMessage(null)
  }

  if (user.token === null) {
    return (
      <div className='m-4'>
        <p className='lead text-center'>You should be logged in to view this page!</p>
      </div>
    )
  }

  return (
    <div className='container d-flex flex-column align-items-center mt-4'>
      <header className={`text-center container`}>
        <h1 className='boldest'>Dash<span className='text-danger'>board</span></h1>
      </header>

      <main className='d-flex flex-column align-items-center mt-4 col-12'>
        <p className='text-center'>You will receive alerts in <b>{user.email}</b></p>

        <div className='border border-dark rounded table-responsive p-4 m-4 col-12 col-md-8 col-xl-6'>
          {websites.length !== 0
            ? <Websites websites={websites} onClick={deleteWebsite} />
            : <p className='m-4 text-center'>You are not tracking any websites!</p>
          }
        </div>

        <form className='row mt-2' onSubmit={addWebsite}>
          <div className='input-group'>
            <input
              type='text'
              name='website'
              value={URL}
              onChange={changeURL}
              placeholder='Website'
              className={`form-control noborder`}
            />
            <button className='btn btn-dark' type='submit'>Add</button>
          </div>
        </form>

        {message
          ? <div className={`text-${message.type === 'error' ? 'danger' : 'success'} text-center mt-2`}>
              {message.content}
            </div>
          : null
        }
      </main>
    </div>
  )
}
