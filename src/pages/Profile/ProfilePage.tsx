import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/store/store'
import { updateUser } from '../../entities/user/model/userSlice'

import { SearchInput } from '../../shared/ui/TextInput/SearchInput/SearchInput'
import { TextAreaInput } from '../../shared/ui/TextInput/TextInput/TextAreaInput'
import { TextInput } from '../../shared/ui/TextInput/TextInput/TextInput'
import { Select } from '../../shared/ui/Select/Select'
import calendarIcon from '../../shared/assets/icons/calendarIcon.svg'
import edit from '../../shared/assets/icons/edit.svg'
import request from '../../shared/assets/svg/request.svg'
import messageText from '../../shared/assets/svg/messageText.svg'
import like from '../../shared/assets/svg/like.svg'
import idea from '../../shared/assets/svg/idea.svg'
import userIcon from '../../shared/assets/svg/user.svg'

import styles from './ProfilePage.module.css'

const ProfilePage = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector((state) => state.user.isLoadingUpdate)
  const users = useAppSelector((state) => state.user.allUsers)
  const user = useAppSelector((state) => state.user.profileUser)
  const safe = (v: unknown) => (typeof v === 'string' ? v : '')

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    birthday: '',
    gender: '',
    city: '',
    about: '',
  })

  // Для автокомплита города, searchInput и textInput не поддерживают список вариантов городов
  const cities = useMemo(
    () => Array.from(new Set(users.map((user) => user.city))).filter(Boolean),
    [users],
  )

  void cities

  useEffect(() => {
    if (!user) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData({
      email: safe(user.email),
      name: safe(user.name),
      birthday: safe(user.birthDate),
      gender: safe(user.gender),
      city: safe(user.city),
      about: safe(user.about),
    })
  }, [user])

  if (!user) {
    return <p>Пожалуйста, войдите в аккаунт</p>
  }
  const initialBirthday = safe(user.birthDate)

  // Требуется по тз но TextInput принимает onChange?: (value: string) => void

  const updateField = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  /*  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }*/

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(updateUser(formData))
  }

  const isPristine =
    formData.name === safe(user.name) &&
    formData.email === safe(user.email) &&
    formData.city === safe(user.city) &&
    formData.about === safe(user.about) &&
    formData.gender === safe(user.gender) &&
    formData.birthday === initialBirthday

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <img src={request} alt="иконка заявки" />
            Заявки
          </li>
          <li className={styles.navItem}>
            <img src={messageText} alt="иконка сообщения" />
            Мои обмены
          </li>

          <li
            className={`${styles.navItem} ${styles.clickable} ${
              pathname === '/favorites' ? styles.active : ''
            }`}
            onClick={() => navigate('/favorites')}
          >
            <img src={like} alt="иконка избранного" />
            Избранное
          </li>

          <li className={styles.navItem}>
            <img src={idea} alt="иконка горящая лампочка" />
            Мои навыки
          </li>

          <li
            className={`${styles.navItem} ${styles.clickable} ${
              pathname === '/profile' ? styles.active : ''
            }`}
            onClick={() => navigate('/profile')}
          >
            <img src={userIcon} alt="иконка пользователя" />
            Личные данные
          </li>
        </ul>
      </aside>

      {/* Main */}
      <section className={styles.content}>
        <form className={styles.form} onSubmit={handleSave}>
          <TextInput
            label="Почта"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={updateField('email')}
            rightSlot={<img src={edit} alt="редактировать" />}
          />

          <p className={styles.passwordStub}>Изменить пароль</p>

          <TextInput
            className={styles.input}
            label="Имя"
            name="name"
            value={formData.name}
            onChange={updateField('name')}
            rightSlot={<img src={edit} alt="редактировать" />}
          />

          <div className={styles.row}>
            <div className={styles.field}>
              <TextInput
                label="Дата рождения"
                name="birthday"
                className={styles.selectInput}
                value={formData.birthday}
                onChange={updateField('birthday')}
                placeholder="ДД.ММ.ГГГГ"
                rightSlot={<img src={calendarIcon} alt="календарь" />}
              />
            </div>

            <div className={styles.field}>
              <Select
                className={styles.selectInput}
                label="Пол"
                placeholder="Выберите пол"
                options={['Женский', 'Мужской']}
                value={formData.gender}
                onChange={(value) => updateField('gender')(value as string)}
              />
            </div>
          </div>

          <SearchInput
            label="Город"
            name="city"
            value={formData.city}
            showIcon={false}
            showClearButton={false}
            onChange={updateField('city')}
            placeholder="Город"
          />

          <TextAreaInput
            label="О себе"
            name="about"
            value={formData.about}
            onChange={updateField('about')}
            placeholder="Расскажите о себе"
            rightSlot={<img src={edit} alt="редактировать" />}
          />
          <button type="submit" className={styles.saveButton} disabled={isPristine || isLoading}>
            {isLoading ? 'Сохраняем...' : 'Сохранить'}
          </button>
        </form>
        {/* Правая колонка (заглушка) */}
        <aside className={styles.rightColumn}>
          <p>Заглушка профиля</p>
        </aside>
      </section>
    </div>
  )
}

export default ProfilePage
