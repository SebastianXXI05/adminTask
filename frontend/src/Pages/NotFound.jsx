import { Link } from "react-router-dom"

export default () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className="text-3xl text-gray-600">404</h1>
      <p className="text-4xl mb-4 font-bold">Not Found</p>
      <Link className="text-sky-600 underline hover:text-sky-800" to='/'>Back Home</Link>
    </div>
  )
}