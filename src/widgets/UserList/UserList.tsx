import styles from './UserList.module.css'
import { useState } from 'react'
import sorticon from '/src/shared/assets/icons/sort.png'
import arrowright from '/src/shared/assets/icons/arrowright.png'
import { useAppSelector } from '../../app/store/store'
import { selectPopularUsers } from '../../entities/user/model/selectors'
import { selectNewUsers } from '../../entities/user/model/selectors'
import { selectRecommendedUsers } from '../../entities/user/model/selectors'
import { selectFilteredUsers } from '../../entities/user/model/selectors'
import { UserCard } from '../user-card/UserCard'
import { initialState } from '../../entities/user/model/filterSlice'
import { Button } from '../../shared/ui/Button'
import type { TSkill } from '../../shared/utils/types'

const DEFAULT_SKILL: TSkill = {
  id: 0,
  categoryId: 0,
  subcategoryId: 0,
  userId: 0,
  title: 'Навыки не указаны',
  description: 'Пользователь еще не заполнил информацию о своих услугах',
  imagesUrl: [],
}

export const UserList = ({
  variant = 'homepage',
}: {
  variant?: 'homepage' | 'skillpage' | 'favoritpage'
}) => {
  // Состояния для отображения
  const [showAllPopular, toggleShowAllPopular] = useState(false)
  const [showAllNew, toggleShowAllNew] = useState(false)
  const [showAllSkillpage, toggleShowAllSkillpage] = useState(false)

  // состояние сортировки
  const [isNewFirst, setIsNewFirst] = useState(true)
  const toggleSort = () => {
    setIsNewFirst(!isNewFirst)
    // Здесь также можно вызвать функцию самой сортировки filteredUsers
  }
  //вытаскиваем все фильтры
  const filters = useAppSelector((state) => state.filter)
  //вытаскиваем всех пользователей
  const allUsers = useAppSelector((state) => state.user.allUsers)
  //вытаскиваем пользователей, отфильтрованных по популярности
  const usersPopular = useAppSelector(selectPopularUsers)
  //вытаскиваем всех пользователей, отфильтрованных по дате
  const usersNew = useAppSelector(selectNewUsers)
  //вытаскиваем пользователей-список рекомендаций
  const usersRecommended = useAppSelector(selectRecommendedUsers)
  //вытаскиваем все подкатегории
  const allSubcategories = useAppSelector((state) => state.skill.allSubcategories)
  //вытаскиваем все скиллы
  const allSkills = useAppSelector((state) => state.skill.allSkills)
  //вытаскиваем отфильтрованных пользователей или найденных по поиску
  const filteredUsers = useAppSelector(selectFilteredUsers)
  //подключаем сортировку по новизне для отфильтрованных пользователей
  const filteredPlusNewUsers = useAppSelector((state) => selectNewUsers(state, filteredUsers))
  const displayedUsers = isNewFirst ? filteredUsers : filteredPlusNewUsers
  //
  const favoriteSkillIds = useAppSelector((state) => state.user.profileUser?.favoritesSkills || [])
  // Для стабильности работы
  if (allSubcategories.length === 0) return null
  // проверка, отличается ли фильтр от начального
  const filtersActive =
    filters.skillsType !== initialState.skillsType ||
    filters.gender !== initialState.gender ||
    filters.selectedCategoryIds.length > 0 ||
    filters.selectedSubcategoryIds.length > 0 ||
    filters.city.length > 0 ||
    filters.searchText.trim() !== ''
  // || 1 === 1 //Убрать, это для теста

  const HomeLayout = () => {
    // Сценарий 1: Пользователь что-то ищет или применил фильтры
    if (filtersActive) {
      return (
        <div className={styles.container}>
          <section className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Подходящие предложения: {filteredUsers.length}</h2>
            <Button variant="tertiary" onClick={toggleSort}>
              <img src={sorticon} alt="сортировка" className={styles.imgBtn} />
              {isNewFirst ? 'Сначала новые' : 'По алфавиту'}
            </Button>
          </section>
          <ul className={styles.userList}>
            {displayedUsers.map((user) => {
              const userSubs = allSubcategories.filter((sub) =>
                user.subcategoriesWanted.includes(sub.id),
              )
              const userSkill = allSkills.find((skill) => skill.userId === user.id)
              return (
                <UserCard
                  key={user.id}
                  user={user}
                  subcategories={userSubs}
                  skill={userSkill || DEFAULT_SKILL}
                />
              )
            })}
          </ul>
        </div>
      )
    }

    // Сценарий 2: Дефолтная главная страница (блоки по категориям)
    return (
      <div className={styles.container}>
        <section className={styles.section}>
          <section className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Популярное</h2>
            <Button variant="tertiary" onClick={() => toggleShowAllPopular(!showAllPopular)}>
              Смотреть все <img className={styles.imgBtn} src={arrowright} alt="стрелка" />
            </Button>
          </section>
          <ul className={styles.userList}>
            {(showAllPopular ? usersPopular : usersPopular.slice(0, 3)).map((user) => {
              const userSubs = allSubcategories.filter((sub) =>
                user.subcategoriesWanted.includes(sub.id),
              )
              const userSkill = allSkills.find((skill) => skill.userId === user.id)
              return (
                <UserCard
                  key={user.id}
                  user={user}
                  subcategories={userSubs}
                  skill={userSkill || DEFAULT_SKILL}
                />
              )
            })}
          </ul>
        </section>

        <section className={styles.section}>
          <section className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Новое</h2>
            <Button variant="tertiary" onClick={() => toggleShowAllNew(!showAllNew)}>
              Смотреть все <img className={styles.imgBtn} src={arrowright} alt="стрелка" />
            </Button>
          </section>
          <ul className={styles.userList}>
            {(showAllNew ? usersNew : usersNew.slice(0, 3)).slice(0, 9).map((user) => {
              const userSubs = allSubcategories.filter((sub) =>
                user.subcategoriesWanted.includes(sub.id),
              )
              const userSkill = allSkills.find((skill) => skill.userId === user.id)
              return (
                <UserCard
                  key={user.id}
                  user={user}
                  subcategories={userSubs}
                  skill={userSkill || DEFAULT_SKILL}
                />
              )
            })}
          </ul>
        </section>

        <section className={styles.section}>
          <section className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Рекомендуем</h2>
          </section>
          <ul className={styles.userList}>
            {usersRecommended.map((user) => {
              const userSubs = allSubcategories.filter((sub) =>
                user.subcategoriesWanted.includes(sub.id),
              )
              const userSkill = allSkills.find((skill) => skill.userId === user.id)
              return (
                <UserCard
                  key={user.id}
                  user={user}
                  subcategories={userSubs}
                  skill={userSkill || DEFAULT_SKILL}
                />
              )
            })}
          </ul>
        </section>
      </div>
    )
  }

  const SkillLayout = () => {
    return (
      <div className={styles.container}>
        <section className={styles.resultsHeader}>
          <h2 className={styles.resultsTitle}>Похожие предложения</h2>
          <Button variant="tertiary" onClick={() => toggleShowAllSkillpage(!showAllSkillpage)}>
            Смотреть все <img className={styles.imgBtn} src={arrowright} alt="стрелка" />
          </Button>
        </section>
        <ul className={styles.userListSkill}>
          {(showAllSkillpage ? allUsers : allUsers.slice(0, 4)).map((user) => {
            const userSubs = allSubcategories.filter((sub) =>
              user.subcategoriesWanted.includes(sub.id),
            )
            const userSkill = allSkills.find((skill) => skill.userId === user.id)

            return (
              <UserCard
                key={user.id}
                user={user}
                subcategories={userSubs}
                skill={userSkill || DEFAULT_SKILL}
              />
            )
          })}
        </ul>
      </div>
    )
  }

  const FavoritesLayout = () => {
    const favoriteUsers = allUsers.filter((user) => favoriteSkillIds.includes(user.skillOfferedId))
    return (
      <div className={styles.container}>
        <ul className={styles.userList}>
          {favoriteUsers.map((user) => {
            const userSubs = allSubcategories.filter((sub) =>
              user.subcategoriesWanted.includes(sub.id),
            )
            const userSkill = allSkills.find((skill) => skill.userId === user.id)
            return (
              <UserCard
                key={user.id}
                user={user}
                subcategories={userSubs}
                skill={userSkill || DEFAULT_SKILL}
              />
            )
          })}
        </ul>
      </div>
    )
  }

  // В самом конце компонента UserList возвращаем нужный вариант:
  if (variant === 'homepage') return <HomeLayout />
  if (variant === 'skillpage') return <SkillLayout />
  if (variant === 'favoritpage') return <FavoritesLayout />

  return null
}
