import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import convertMonth from '../utils/convertMonth'

export default ({ task }) => {
  const navigate = useNavigate()
  const [ doned, setDoned ] = useState(task.done)
  const [ windowSize, setWindowSize ] = useState(innerWidth)

  async function handleDelete() {
    const url = import.meta.env.VITE_API+task.id
    const res = await fetch(url, { method: 'DELETE' })

    if (res.ok) navigate('/')
  }

  window.addEventListener('resize', () => setWindowSize(innerWidth))

  return (
    <div 
      to={'a'+task.id}
      className={`flex justify-between items-center border border-gray-500 rounded py-2 
      px-4 mb-4 hover:border-sky-500 ${doned ? 'bg-gray-100' : ''}`}
    >
      <div>
        <span className="text-gray-500 text-xs italic">
          { convertMonth(task.month) }
        </span>
        <h3 className="mr-4">
          { 
            task.title.length > 8 ?
              windowSize <= 400 ?
                task.title.slice(0, 6)+'...'
              :
              windowSize <= 500 && task.title.length > 10 ?
                task.title.slice(0, 11)+'...'
              : 
              windowSize <= 600 && task.title.length > 21 ?
                task.title.slice(0, 22)+'...' 
              :
              (windowSize <= 700 || windowSize < 768) && task.title.length > 31 ?
                task.title.slice(0, 32)+'...'
              :
              windowSize >= 768 && windowSize <= 1109 && task.title.length > 27 ?
                task.title.slice(0, 28)+'...' 
              : task.title
            :
            task.title
          }
        </h3>
      </div>
      <div>
      <button 
          onClick={handleDelete} 
          className={"px-4 py-2 mr-3 bg-green-500 rounded hover:bg-green-700"}
        >
          <img 
            className='invert' 
            src={!doned ? 'check-lg.svg' : 'x-lg.svg'} 
            alt={!doned ? 'check image' : 'x image'} 
          />
        </button>
        <button className="px-4 py-2 mr-3 bg-sky-500 rounded hover:bg-sky-700">
          <Link to={`/update/${task.id}`}>
            <img className='invert' src="pencil.svg" alt="pencil icon" />
          </Link>
        </button>
        <button 
          onClick={handleDelete} 
          className={"px-4 py-2 bg-red-500 rounded hover:bg-red-700"}
        >
          <img className='invert' src="trash.svg" alt="trash icon" />
        </button>
      </div>
    </div>
  )
}