import { Formik, Form, Field, } from 'formik'
import { useNavigate } from 'react-router-dom'
import { object, string, number } from 'yup'

import MessageError from '../components/MessageError'
import taskSchemaValidate from '../utils/taskSchemaValidate'

export default () => {
  const navigate = useNavigate()

  async function handleSubmit(values) {
    const url = import.meta.env.VITE_API

    if (values.description.length === 0) {
      delete values.description
    }

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...values, month: Number(values.month) })
    }

    const res = await fetch(url, settings)

    if (res.ok) {
      navigate('/', { state: { message: 'A task was create successful' } })
    }
  }

  return (
    <div className='w-11/12 mx-auto md:w-1/2'>
      <h1 className='font-bold text-center text-3xl mb-16 md:text-4xl md:mb-8'>
        Create Task
      </h1>

      <Formik
        initialValues={{
          title: '',
          month: '1',
          description: '',
          done: false
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
            </Field>

            <label className='mb-2' htmlFor="description">Description</label>
            { errors.description && touched.description ? (
              <MessageError message={errors.description} />
            ): null }
            <Field
              as="textarea"
              name="description"
              className='mb-4 border border-gray-400 rounded p-1 focus-visible:
            outline-none h-36'
            />

            <label className='mb-8' htmlFor="done">
              <Field className='mr-2' type='checkbox' name='done' />
              Mark like done
            </label>

            <button type="submit" className='bg-green-500 py-2 px-4 rounded text-white md:w-fit'>
              Create task
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}