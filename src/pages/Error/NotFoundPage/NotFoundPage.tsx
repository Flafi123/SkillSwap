import React, { useState } from 'react'
import styles from '../ErrorPage.module.css'
import { Button } from '../../../shared/ui/Button/Button'
import { Link } from 'react-router-dom'

import errorImage_404 from '../../../shared/assets/svg/error_404.svg'

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={errorImage_404} alt="Ошибка 404" className={styles.image} />

        <h1 className={styles.title}>Страница не найдена</h1>

        <p className={styles.description}>
          К сожалению, эта страница недоступна. Вернитесь <br></br> на главную страницу или
          попробуйте позже
        </p>

        <div className={styles.actions}>
          <Button variant="secondary">Сообщить об ошибке</Button>

          <Link to="/">
            <Button>На главную</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
