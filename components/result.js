import { parse } from 'tldts'

function Statistic({ property, value }) {
  return (
    <div className='d-flex justify-content-between'>
      <b>{property}</b>
      <span className=''>{value ?? 'N/A'}</span>
    </div>
  )
}

export default function Result({ result }) {
  if (result === 'Checking') {
    return <p className='lead mt-5'>{result}...</p>
  }

  const {status, statusText, host } = result
  const { domainWithoutSuffix } = parse(host)

  if (domainWithoutSuffix === null) {
    return null
  }

  const name =
    domainWithoutSuffix[0].toUpperCase() + domainWithoutSuffix.substring(1)

  return (
    <div className='card mt-5 border-dark col-8 col-lg-6 col-xl-5'>
      <div className='card-body'>
        <h3 className='mb-3'>{name}</h3>
        <Statistic property='Status code' value={status} />
        <Statistic property='Status text' value={statusText} />
        <Statistic property='Host name' value={host} />
        <p className='mt-4 mb-0'>
          {status >= 200 && status < 400
            ? <b className='text-success'>&#9679; {name} is up and reachable by us.</b>
            : <b className='text-danger'>&#9679; {name} might be down right now!</b>
          }
        </p>
      </div>
    </div>
  )
}
