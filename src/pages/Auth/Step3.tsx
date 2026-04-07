import React from 'react'
import authStyles from './Auth.module.css'
import { getAuthStepTitleId } from './authStepIds'
import { RegistrationStepHeader } from './RegistrationStepHeader'

export const AuthStepThirdPage: React.FC = () => {
  return (
    <section className={authStyles.page} aria-labelledby={getAuthStepTitleId(3)}>
      <RegistrationStepHeader step={3} />
      <div>Авторизация. Шаг 3.</div>
    </section>
  )
}
