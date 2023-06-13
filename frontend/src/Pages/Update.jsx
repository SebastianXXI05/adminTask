import { Formik, Form, Field, } from 'formik'
import { useNavigate, useLoaderData } from 'react-router-dom'

import MessageError from '../components/MessageError'
import taskSchemaValidate from '../utils/taskSchemaValidate'

function Update () {
  const {task} = useLoaderData()

  console.log(task.data)

  const navigate = useNavigate() 

  async function handleSubmit(values) {
    const url = `${import.meta.env.VITE_API}${task.data.id}`

    if (values.description.length === 0) {
      delete values.description
    }

    const settings = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...values, month: Number(values.month) })
    }

    const res = await fetch(url, settings)

    if (res.ok) {
      navigate('/', {state: { message: 'A task was update' }})
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
          month: task.data.month,
          description: task.data.description??'',
          done: task.data.done
        }}
        validationSchema={taskSchemaValidate}
        onSubmit={(values) => handleSubmit(values)}
      >

        {({ errors, touched }) => (
          <Form
            className='border-2 border-gray-400 rounded px-4 py-8 mb-4 flex flex-col'
          >
            <label className='mb-2 relative' htmlFor="title">Title</label>
            { errors.title && touched.title ? (
              <MessageError message={errors.title} />
            ): null }
            <Field
              type="text" name="title"
              className='mb-4 border border-gray-400 rounded p-1 focus-visible:
              outline-none focus-visible:border-sky-400'
              maxLength="50"
            />

            <label className='mb-2' htmlFor="month">Month</label>
            { errors.month && touched.month ? (
              <MessageError message={errors.month} />
            ): null }
            <Field
              as="select"
              name="month"
              className='mb-4 border border-gray-400 rounded p-1 focus-visible:
              outline-none'
              maxLength="500"
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </Field>

            <label className='mb-2' htmlFor="description">Description</label>
            { errors.description && touched.description ? (
              <MessageError message={errors.description} />
            ): null }
            <Field
              placeholder="(Optional)"
              as="textarea"
              name="description"
              className='mb-4 border border-gray-400 rounded p-1 focus-visible:
            outline-none h-36'
            />

            <label className='mb-8' htmlFor="done">
              <Field className='mr-2' type='checkbox' name='done' />
              Mark like done
            </label>

            <button type="submit" className='bg-sky-500 py-2 px-4 rounded text-white md:w-fit'>
              Update task
            </button>
          </Form>
        )}
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