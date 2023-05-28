import { Link, Outlet } from "react-router-dom" 

export default () => {
  return (
    <div className='overflow-x-hidden'>
      <header className='flex justify-center py-4 border-b border-sky-300'>
        <Link to='/'>
          <img src="/vite.svg" alt="logo" />
        </Link>
      </header>
      <div className='mt-12 mb-5'>
        <Outlet />
      </div>
    </div>
  )
}