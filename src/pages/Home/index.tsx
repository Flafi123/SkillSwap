import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom' // Добавили useNavigate
import styles from './Home.module.css'
import { AppliedFilterChips } from '../../widgets/AppliedFilterChips'
import { UserList } from '../../widgets/UserList'
import { Filters } from '../../widgets/Filters'
import { OfferCreatedModal } from '../../widgets/Modals/OfferCreatedModal'
import { resetDraftSkill } from '../../entities/Skill/model/skillSlice'
import { resetDraftUser } from '../../entities/user/model/userSlice'

const HomePage: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(() => {
    const state = location.state as { openOfferCreatedModal?: boolean } | null
    return Boolean(state?.openOfferCreatedModal)
  })

  const handleCloseModal = () => {
    setIsOfferModalOpen(false)
    resetDraftSkill()
    resetDraftUser()
    localStorage.removeItem('register_category')
  }

  useEffect(() => {
    if (isOfferModalOpen) {
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [isOfferModalOpen, navigate, location.pathname])

  return (
    <div className={styles.container}>
      <OfferCreatedModal isOpen={isOfferModalOpen} onClose={handleCloseModal} />
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
