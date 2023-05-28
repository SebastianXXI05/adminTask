import { useLoaderData, Link } from 'react-router-dom'

export default function Home() {
  const { tasks } = useLoaderData()

  console.log(tasks)

  return (
    <div className='w-11/12 mx-auto'>
      <h1 className='font-bold text-center text-3xl mb-16'>My Tasks</h1>

      <div className='flex justify-center mb-2'>
        <Link 
          to='/create'
          className='bg-green-500 py-2 px-4 rounded text-white'
        >
          Create new task
        </Link>
      </div>
      <main className='border-2 border-gray-400 h-96 rounded p-4'>
        <div className='flex justify-center border-b border-gray-400 pb-2 mb-4'>
          <input 
          className="border border-gray-400 rounded p-1 focus-visible:
          outline-none focus-visible:border-sky-400" 

          type="text" 
          placeholder="Search by title" />
        </div>
      </main>
    </div>
  )
}

export async function loaderHome() {
  const url = 'https://admintask-backend-production.up.railway.app/api/task'
  const res = await fetch(url)
  const tasks = await res.json()

  return { tasks }
}