import { Link, Outlet } from "react-router-dom" 

export default () => {
  return (
    <div className='overflow-x-hidden'>
      <header>
        <Link to='/'>
          <img src="/vite.svg" alt="logo" />
        </Link>
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  )
}