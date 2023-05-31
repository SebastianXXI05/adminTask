import { Link, useNavigate } from "react-router-dom"

export default ({ id, title }) => {
  const navigate = useNavigate()

  async function handleDelete() {
    const url = 'https://admintask-backend-production.up.railway.app/api/task/'+id

    const res = await fetch(url, { method: 'DELETE' })

    if (res.ok) {
      navigate('/', {state: { message: 'A task deleted' }})
    }
  }

  return (
    <div 
      to={'a'+id}
      className='flex justify-between items-center border border-gray-500 rounded py-2 
      px-4 mb-4 hover:border-sky-500' 
    >
      <h3 className="mr-4">{ title }</h3>
      <div>
        <button className="px-4 py-2 bg-sky-500 rounded mr-3 hover:bg-sky-700">
          <Link to={`/update/${id}`}>
            <img className='invert' src="pencil.svg" alt="pencil icon" />
          </Link>
        </button>
        <button onClick={handleDelete} className="px-4 py-2 bg-red-500 rounded hover:bg-red-700">
          <img className='invert' src="trash.svg" alt="trash icon" />
        </button>
      </div>
    </div>
  )
}