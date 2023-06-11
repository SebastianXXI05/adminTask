import { Formik, Form, Field, } from 'formik'
import { useNavigate, useLoaderData } from 'react-router-dom'
import { useState } from 'react'

function Update () {
  const {task} = useLoaderData()

  const [ formError, setFormError ] = useState(false)

  const navigate = useNavigate() 

  async function handleSubmit(values) {
    const url = `${import.meta.env.VITE_API}${task.data.id}`

    const settings = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...values, month: Number(values.month) })
    }

    const res = await fetch(url, settings)

    if (res.ok) {
      navigate('/', {state: { message: 'A task updated' }})
    }
    else {
      setFormError(true)
    }
  }

  return (
    <div className='w-11/12 mx-auto md:w-1/2'>
      <h1 className='font-bold text-center text-3xl mb-16 md:text-4xl md:mb-8'>
        Update Task
      </h1>

      <Formik
        initialValues={{
          title: task.data.title,
          month: task.data.month
        }}
        
        onSubmit={(values) => handleSubmit(values)}
      >

        <Form
          className='border-2 border-gray-400 rounded px-4 py-8 mb-4 flex flex-col'
        >
          {formError ? <h6 className='text-red-500 mb-2'>Invalid content</h6> : null}
          <label className='mb-4' htmlFor="title">Title</label>
          <Field
            type="text" name="title"
            className='mb-4 border border-gray-400 rounded p-1 focus-visible:
          outline-none focus-visible:border-sky-400'
          />

          <label className='mb-4' htmlFor="month">Month</label>
          <Field
            as="select"
            name="month"
            className='mb-8 border border-gray-400 rounded p-1 focus-visible:
            outline-none'
          >
            <option value="1">January</option>
            <option value="2">February</option>
          </Field>

          <button type="submit" 
            className='bg-sky-500 py-2 px-4 rounded text-white hover:bg-sky-700 md:w-fit'
          >
            Update task
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export const loaderUpdate = async ({ params }) => {
  const url = `${import.meta.env.VITE_API}${params.id}`
  const res = await fetch(url)
  const task = await res.json()

  return {task}
}

export default Update