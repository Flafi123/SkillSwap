import React from 'react'
import { Link } from 'react-router-dom'

export const AuthStepSecondPage: React.FC = () => {
  return (
    <div>
      <h1>Авторизация. Шаг 2.</h1>
      <Link to={'/register/step-1'}>
        <button>Назад</button>
      </Link>
      <Link to={'/register/step-3'}>
        <button>Продолжить</button>
      </Link>
    </div>
  )
}
