import { useLoaderData } from 'react-router-dom'

const Home = () => {
  const { posts } = useLoaderData()
  console.log(posts)
  return (
    <div>
      <h1>Home</h1>
      <main>
        
      </main>
    </div>
  )
}

export default Home

export const loaderHome = async () => {
  const res = await fetch('https://admintask-backend-production.up.railway.app/api/task')
  const posts = await res.json()

  return { posts }
}