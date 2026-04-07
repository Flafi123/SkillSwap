import React from 'react'
import { Link } from 'react-router-dom'
import authStyles from './Auth.module.css'
import { getAuthStepTitleId } from './authStepIds'
import { RegistrationStepHeader } from './RegistrationStepHeader'

export const AuthStepSecondPage: React.FC = () => {
  return (
    <section className={authStyles.page} aria-labelledby={getAuthStepTitleId(2)}>
      <RegistrationStepHeader step={2} />
      <div>
        <Link to="/register/step-1">
          <button type="button">Назад</button>
        </Link>
        <Link to="/register/step-3">
          <button type="button">Продолжить</button>
        </Link>
      </div>
    </section>
  )
}
