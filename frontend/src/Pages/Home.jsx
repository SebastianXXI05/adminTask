import { useLoaderData, Link, useLocation } from 'react-router-dom'
import Task from '../components/Task'
import { useState, useEffect } from 'react'

export default function Home() {
  const { tasks } = useLoaderData()
  const location = useLocation()
  const message = location.state?.message
  const [ showMessage, setShowMessage ] = useState(false)

  useEffect(() => {
    if (message !== undefined) {
      setShowMessage(true)
      setInterval(() => setShowMessage(false), 4000)
    }
  }, [])

  return (
    <div className='w-11/12 mx-auto md:w-2/3'>
      {showMessage ?
        <div 
          className='absolute bg-sky-500 text-white py-1 px-2 rounded top-16 
          right-2 w-2/3 opacity-70'
        >
        { message }
        </div>
        : null
      }
      <h1 className='font-bold text-center text-3xl mb-16 md:text-4xl md:mb-8'>
        My Tasks
      </h1>

      <div className='flex justify-center mb-2 md:justify-end'>
        <Link 
          to='/create'
          className='bg-green-500 py-2 px-4 rounded text-white hover:bg-green-600'
        >
          Create new task
        </Link>
      </div>
      <main className='border-2 border-gray-400 h-96 rounded p-4'>
        <div className='flex justify-center border-b border-gray-400 pb-2 mb-4'>
          <input 
          className="border border-gray-400 rounded p-1 focus-visible:
          outline-none focus-visible:border-sky-500 pr-9" 

          type="text" 
          placeholder="Search by title" />
          <span>
            <img src="x-lg.svg" alt="x image" />
          </span>
        </div>
        <section className='overflow-y-auto h-72'>
          {
            tasks.data.map(task => {
              return (
                <article key={task.id}>
                  <Task task={task} />
                </article>
              )
            })
          }
        </section>
      </main>
    </div>
  )
}

export async function loaderHome() {
  const url = import.meta.env.VITE_API
  const res = await fetch(url)
  const tasks = await res.json()

  return { tasks }
}