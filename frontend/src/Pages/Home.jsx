import { useLoaderData, Link, useLocation, json } from 'react-router-dom'
import Task from '../components/Task'
import { useState, useEffect } from 'react'

export default function Home() {
  const { fetchTasks } = useLoaderData()
  const location = useLocation()
  const message = location.state?.message
  const [ showMessage, setShowMessage ] = useState(false)
  const [ search, setSearch ] = useState('')
  const [ tasks, setTasks ] = useState(fetchTasks)

  function handleSearch(title) {
    setSearch(title)

    async function searchByTitle(url) {
      const res = await fetch(url)
      const data = await res.json()
      setTasks(data)
    }

    if (title.length === 0) {
      const url = import.meta.env.VITE_API
      searchByTitle(url)
    }
    else {
      const url = `${import.meta.env.VITE_API}search?title=${title}`
      searchByTitle(url)
    }
  }

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
        <div 
          className='flex justify-center border-b border-gray-400 pb-2 mb-4'
        >
          <div 
            className="w-fit flex relative"
          >
            <input 
              className="border border-gray-400 rounded p-1 focus-visible:
              outline-none focus-visible:border-sky-500 pr-9" 
              type="text" 
              placeholder="Search by title" 
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button 
              className='absolute right-2.5 top-1.5'
              hidden={search.length !== 0 ? false : true}
              onClick={() => handleSearch('')}
            >
              <img className='w-5 h-5' src="x-lg.svg" alt="x image" />
            </button>
          </div>
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
  const fetchTasks = await res.json()

  return { fetchTasks }
}