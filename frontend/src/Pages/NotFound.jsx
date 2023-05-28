import { useRouteError, Link } from 'react-router-dom'

export default () => {
  const error = useRouteError()

  return (
    <div>
      <h1>{error.status}</h1>
      <p>{error.statusText}</p>
      <Link to='/'>Back Home</Link>
    </div>
  )
}