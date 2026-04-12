import * as yup from 'yup'
// import users from '../../../public/db/users.json'

// const existingEmails = (users as { users: { email: string }[] }).users.map((user) =>
//   user.email.toLowerCase(),
// )

const regExpEmail: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validationSchema = yup.object().shape({
  email: yup.string().required('Обязательное поле').matches(regExpEmail, 'Некорректный email'),
  // .test('unique-email', 'Email уже используется', function (value) {
  //   if (!value) return true
  //   return !existingEmails.includes(value.toLowerCase())
  // }),
  password: yup
    .string()
    .required('Обязательное поле')
    .min(8, 'Минимум 8 символов')
    .matches(/[A-Z]/, 'Должна быть хотя бы одна заглавная буква')
    .matches(/[a-z]/, 'Должна быть хотя бы одна строчная буква')
    .matches(/[0-9]/, 'Должна быть хотя бы одна цифра'),
})

export const step2Schema = yup.object({
  name: yup
    .string()
    .required('Имя обязательно')
    .max(50, 'Имя не должно превышать 50 символов'),
  birthDate: yup.string().required('Укажите дату рождения'),
  gender: yup.string().default('Не указан'),
  city: yup.string().default(''),
  categoryId: yup.string().default(''),
  subcategoryId: yup.string().default(''),
  avatarUrl: yup.mixed<File | string>().nullable().required('Аватар обязателен'),
})
