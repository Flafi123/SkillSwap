import styles from './Home.module.css'
import { UserList } from '../../widgets/UserList'
import { Filters } from '../../widgets/Filters'

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Filters />
      <UserList />
    </div>
  )
}

export default HomePage
