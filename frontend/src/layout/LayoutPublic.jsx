import { Link, Outlet } from 'react-router-dom'

export default () => {
  return (
    <>
      <header>
        <Link to='/'>
          <img src="/vite.svg" alt="logo" />
        </Link>
        <div>
          <Outlet />
        </div>
      </header>
    </>
  )
}