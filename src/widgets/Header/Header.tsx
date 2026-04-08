import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowUp } from '../../shared/assets/icons'
import likeIcon from '../../shared/assets/icons/like.png'
import moonIcon from '../../shared/assets/icons/moon.png'
import notificationIcon from '../../shared/assets/icons/notification.png'
import close from '../../shared/assets/icons/close.png'
import { Button } from '../../shared/ui/Button'
import { IconButton } from '../../shared/ui/IconButton'
import { Logo } from '../../shared/ui/Logo'
import { SearchInput } from '../../shared/ui/TextInput'
import styles from './Header.module.css'
import { SkillCatalogModal } from '../Modals/SkillCatalogModal/SkillCatalogModal'

interface HeaderProps {
  variant?: 'default' | 'auth' // Добавляем типы для вариантов
}

export const Header = ({ variant = 'default' }: HeaderProps) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const isAuth = false
  const userAvatar = '/images/users/default-avatar.png'
  const userName = 'Мария'

  const catalogIcon = isCatalogOpen ? <ArrowUp /> : <ArrowDown />

  if (variant === 'auth') {
    return (
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerAuth}`}>
          <Logo />
          <Button variant = "tertiary" className={styles.btn} onClick={() => navigate(-1)}>Закрыть<img className = {styles.img} src={close} alt="" /></Button>
        </div>
      </header>
    )
  }
  return (
    <header className={styles.header}>
      <SkillCatalogModal isOpen={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <Logo />

          <nav aria-label="Основная навигация" className={styles.navigation}>
            <ul className={styles.navigationList}>
              <li>
                <Button type="button" variant="tertiary" className={styles.navButton}>
                  О проекте
                </Button>
              </li>
              <li>
                <Button
                  type="button"
                  variant="tertiary"
                  className={styles.catalogButton}
                  onClick={() => setIsCatalogOpen((prevState) => !prevState)}
                  aria-expanded={isCatalogOpen}
                  aria-haspopup="listbox"
                >
                  <span>Все навыки</span>
                  <span className={styles.catalogIcon} aria-hidden="true">
                    {catalogIcon}
                  </span>
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.searchWrapper}>
          <SearchInput value={searchValue} onChange={setSearchValue} placeholder="Искать навык" />
        </div>

        <div className={styles.rightSide}>
          <IconButton
            icon={<img src={moonIcon} alt="" className={styles.actionIcon} />}
            aria-label="Переключить тему"
            type="button"
          />

          {isAuth ? (
            <>
              <IconButton
                icon={<img src={notificationIcon} alt="" className={styles.actionIcon} />}
                aria-label="Уведомления"
                type="button"
              />

              <IconButton
                icon={<img src={likeIcon} alt="" className={styles.actionIcon} />}
                aria-label="Избранное"
                type="button"
                onClick={() => navigate('/favorites')}
              />

              <Link to="/profile" className={styles.profileLink}>
                <span className={styles.userName}>{userName}</span>
                <img
                  src={userAvatar}
                  alt={`Аватар пользователя ${userName}`}
                  className={styles.avatar}
                />
              </Link>
            </>
          ) : (
            <div className={styles.authActions}>
              <Button type="button" variant="secondary" className={styles.authButton}>
                Войти
              </Button>
              <Link to="/register/step-1" className={styles.authButton}>
                <Button type="button" variant="primary" className={styles.authButton}>
                  Зарегистрироваться
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
