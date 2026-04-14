import type { FC } from 'react'
import styles from './Home.module.css'
import { AppliedFilterChips } from '../../widgets/AppliedFilterChips'
import { UserList } from '../../widgets/UserList'
import { Filters } from '../../widgets/Filters'

const HomePage: FC = () => {
  return (
    <div className={styles.container}>
      <Filters />
      <div className={styles.mainColumn}>
        <AppliedFilterChips />
        <div className={styles.userListSection}>
          <UserList />
        </div>
      </div>
    </div>
  )
}

export default HomePage
