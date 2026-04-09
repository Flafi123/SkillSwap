import styles from './Home.module.css'
import React, { useState } from 'react'
import { UserList } from '../../widgets/UserList'

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <p style={{ width: '324px' }}>
        Заглушка вместо фильтров для корректного отображения HomePage
      </p>
      <UserList />
    </div>
  )
}

export default HomePage
