function Website({ website: { id, name, domain }, onClick, index }) {
  return (
    <tr id={id}>
      <th scope="row">{index + 1}</th>
      <td>{name}</td>
      <td>{domain}</td>
      <td>
        <span onClick={onClick} role='button' className='btn-link text-dark'>
          Delete
        </span>
      </td>
    </tr>
  )
}

export default function Websites({ websites, onClick }) {
  return (
    <table className='table table-borderless table-hover'>
      <thead>
        <tr>
          <th scope='col' className='col-1'>#</th>
          <th scope='col' className='col-5'>Name</th>
          <th scope='col' className='col-5'>Domain</th>
          <th scope='col' className='col-1'>Action</th>
        </tr>
      </thead>
      <tbody>
        {websites.map((website, index) => (
          <Website
            key={website.id}
            website={website}
            onClick={onClick}
            index={index}
          />
        ))}
      </tbody>
    </table>
  )
}