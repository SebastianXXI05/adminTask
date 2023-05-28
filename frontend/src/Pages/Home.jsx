

function Home() {
  return (
    <div className='w-11/12 mx-auto'>
      <h1 className='font-bold text-center text-3xl mb-8'>My Tasks</h1>

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

export default Home