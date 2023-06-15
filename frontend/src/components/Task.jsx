import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import convertMonth from '../utils/convertMonth'

export default ({ task }) => {
  const navigate = useNavigate()
  const [ doned, setDoned ] = useState(task.done)
  const [ windowSize, setWindowSize ] = useState(innerWidth)
  const [hidden, setHidden] = useState(false)
  console.log(doned)
  async function handleDelete() {
    const url = import.meta.env.VITE_API+task.id
    const res = await fetch(url, { method: 'DELETE' })

    if (res.ok) {
      navigate('/')
    }
  }

  async function handleChangeDone() {
    const url = `${import.meta.env.VITE_API}${task.id}`
    setDoned(!doned)

    if (task.description === null) {
      delete task.description
    }

    const settings = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...task, done: !doned })
    }

    const res = await fetch(url, settings)

    if (res.ok) {
      console.log('change')
    }
  }

  window.addEventListener('resize', () => setWindowSize(innerWidth))

  return (
    <div 
      className={`flex justify-between items-center border border-gray-500 rounded py-2 
      px-4 mb-4 hover:border-sky-500 ${doned ? 'bg-gray-100' : ''} ${hidden ? 'hidden' : ''}`}
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
      <div className="flex">
        <button  
            className="px-4 py-2 mr-3 bg-green-500 rounded hover:bg-green-700"
            onClick={handleChangeDone}
          >
            <img 
              className='invert' 
              src={doned ? 'x-lg.svg' : 'check-lg.svg'} 
              alt={doned ? 'x image' : 'check image'} 
            />
          </button>
          <Link 
            className="px-4 py-2 mr-3 bg-sky-500 rounded hover:bg-sky-700" 
            to={`/update/${task.id}`}
          >
            <img className='invert' src="pencil.svg" alt="pencil icon" />
          </Link>
          <button 
            onClick={() => {
              setHidden(true)
              handleDelete()
            }}
            className={"px-4 py-2 bg-red-500 rounded hover:bg-red-700"}
          >
            <img className='invert' src="trash.svg" alt="trash icon" />
          </button>
      </div>
    </div>
  )
}