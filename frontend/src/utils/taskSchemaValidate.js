import { object, string, number } from 'yup'

const taskSchemaValidate = object().shape({
  title: string()
    .min(3, 'Minimun characters 3')
    .max(50, 'Too long')
    .required('Required'),
  description: string()
    .min(3, 'Minimun characters 3')
    .max(500, 'Too long!')
    .nullable(),
  month: number()
    .min(1, 'Invalid value')
    .max(12, 'Invalid value')
    .required()
})

export default taskSchemaValidate