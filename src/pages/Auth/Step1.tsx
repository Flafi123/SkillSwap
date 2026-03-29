import React from 'react'
import { Link } from 'react-router-dom'

export const AuthStepFirstPage: React.FC = () => {
  return (
    <div>
      <h1>Авторизация. Шаг 1.</h1>
      <Link to={'/register/step-2'}>
        <button>Далее</button>
      </Link>
    </div>
  )
}
