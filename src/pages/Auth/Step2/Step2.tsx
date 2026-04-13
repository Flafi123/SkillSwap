import React, { useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Стейт
import { useAppDispatch, useAppSelector } from '../../../app/store/store'
import { updateDraftUser } from '../../../entities/user/model/userSlice'

// UI Компоненты
import { ButtonUI } from '../../../shared/ui/Button'
import { TextInput } from '../../../shared/ui/TextInput'
import { DataInput } from '../../../shared/ui/DataInput/DataInput'
import { Select } from '../../../shared/ui/Select'
import { SelectSearch } from '../../../shared/ui/SelectSearch'
import { AvatarInput } from '../../../shared/ui/AvatarInput'
import { step2Schema } from '../../../shared/lib/validation'

import styles from './Step2.module.css'
import step2Illustration from '../../../shared/assets/svg/step2-illustration.svg'
import authStyles from '../Auth.module.css'
import { getAuthStepTitleId } from '../authStepIds'
import { RegistrationStepHeader } from '../RegistrationStepHeader'

type Step2FormData = yup.InferType<typeof step2Schema>

const AuthStepSecondPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Данные из стора
  const { draftUser, allUsers } = useAppSelector((state) => state.user)
  const {
    allCategories: categories,
    allSubcategories: subcategories,
    isLoading,
  } = useAppSelector((state) => state.skill)

  const cities = useMemo(
    () => Array.from(new Set(allUsers?.map((user) => user.city))).filter(Boolean) as string[],
    [allUsers],
  )

  // Настройка формы
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<Step2FormData>({
    resolver: yupResolver(step2Schema),
    mode: 'onTouched',
    defaultValues: {
      name: draftUser.name || '',
      birthDate: draftUser.birthDate || '',
      gender: draftUser.gender || 'Не указан',
      city: draftUser.city || '',
      categoryId: draftUser.categoryId || '',
      subcategoryId: draftUser.subcategoryId || '',
    },
  })

  useEffect(() => {
    if (draftUser.avatarUrl) {
      // Приводим тип к File | string, чтобы TypeScript не ругался
      setValue('avatarUrl', draftUser.avatarUrl as File | string, { shouldValidate: true })
    }
  }, [draftUser.avatarUrl, setValue])

  const currentCatId = watch('categoryId')
  const filteredSubcategories = currentCatId
    ? subcategories.filter((sub) => String(sub.categoryId) === String(currentCatId))
    : subcategories

  // Сохранение и переход
  const onSubmit = (data: Step2FormData) => {
    dispatch(updateDraftUser(data))
    navigate('/register/step-3')
  }
  return (
    <section className={authStyles.page} aria-labelledby={getAuthStepTitleId(2)}>
      <RegistrationStepHeader step={2} />
      <div className={authStyles.cards}>
        <div className={`${authStyles.card} ${styles.formCard}`}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.avatarContainer}>
              <Controller
                name="avatarUrl"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <AvatarInput
                      value={field.value}
                      onChange={(file) => {
                        field.onChange(file)
                        dispatch(updateDraftUser({ avatarUrl: file }))
                      }}
                    />
                    {error && (
                      <span
                        style={{
                          color: '#bf3920',
                          fontSize: '12px',
                          display: 'block',
                          textAlign: 'center',
                        }}
                      >
                        {error.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>

            {/* Имя */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  ref={field.ref}
                  value={field.value}
                  onChange={(val) => {
                    field.onChange(val)
                    dispatch(updateDraftUser({ name: val }))
                  }}
                  maxLength={50}
                  label="Имя"
                  placeholder="Введите ваше имя"
                  isError={!!errors.name}
                  warningMessage={errors.name?.message}
                />
              )}
            />

            <div className={styles.row}>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => (
                  <DataInput
                    {...field}
                    onChange={(e: any) => {
                      const val = e?.target?.value || e
                      field.onChange(val)
                      dispatch(updateDraftUser({ birthDate: val }))
                    }}
                    label="Дата рождения"
                    placeholder="дд.мм.гггг"
                    error={errors.birthDate?.message}
                    minDate={new Date('1925-01-01')}
                    maxDate={new Date()}
                  />
                )}
              />

              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Пол"
                    placeholder="Не указан"
                    options={['Не указан', 'Мужской', 'Женский']}
                    value={field.value}
                    onChange={(val) => {
                      const value = val as string
                      field.onChange(value)
                      dispatch(updateDraftUser({ gender: value }))
                    }}
                  />
                )}
              />
            </div>

            <Controller
              name="city"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div className={styles.cityWrapper}>
                  <SelectSearch
                    className={styles.cityInputOverride}
                    label="Город"
                    placeholder="Выберите город"
                    options={cities}
                    value={field.value}
                    onChange={(val) => {
                      const valueStr = Array.isArray(val) ? val[0] : val
                      // SelectSearch теперь отдает только валидные значения, сохраняем смело
                      field.onChange(valueStr)
                      dispatch(updateDraftUser({ city: valueStr }))
                    }}
                  />
                  {error && (
                    <span style={{ color: '#bf3920', fontSize: '12px' }}>{error.message}</span>
                  )}
                </div>
              )}
            />

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => {
                const currentCat = categories.find((c) => String(c.id) === String(field.value))
                return (
                  <Select
                    label="Категория навыка, которому хотите научиться"
                    placeholder={isLoading ? 'Загрузка...' : 'Выберите категорию'}
                    options={categories.map((c) => c.title)}
                    value={currentCat?.title || ''}
                    onChange={(selectedName) => {
                      const cat = categories.find((c) => c.title === selectedName)
                      if (cat) {
                        const newCatId = String(cat.id)
                        field.onChange(newCatId)
                        dispatch(updateDraftUser({ categoryId: newCatId }))

                        // Проверяем подкатегорию: если не совпадает с новой категорией — стираем
                        const currentSubId = watch('subcategoryId')
                        const currentSub = subcategories.find((s) => String(s.id) === currentSubId)
                        if (currentSub && String(currentSub.categoryId) !== newCatId) {
                          setValue('subcategoryId', '', { shouldValidate: true })
                          dispatch(updateDraftUser({ subcategoryId: '' }))
                        }
                      }
                    }}
                  />
                )
              }}
            />

            {/* Подкатегория (маппинг ID <-> Name) */}
            <Controller
              name="subcategoryId"
              control={control}
              render={({ field }) => {
                const currentSub = filteredSubcategories.find(
                  (s) => String(s.id) === String(field.value),
                )
                return (
                  <Select
                    label="Подкатегория навыка, которому хотите научиться"
                    placeholder={isLoading ? 'Загрузка...' : 'Выберите подкатегорию'}
                    options={filteredSubcategories.map((s) => s.title)}
                    value={currentSub?.title || ''}
                    onChange={(selectedName) => {
                      const sub = filteredSubcategories.find((s) => s.title === selectedName)
                      if (sub) {
                        const newSubId = String(sub.id)
                        field.onChange(newSubId)
                        dispatch(updateDraftUser({ subcategoryId: newSubId }))

                        // Если выбрали подкатегорию — автоматически проставляем её родительскую категорию
                        const parentCatId = String(sub.categoryId)
                        if (watch('categoryId') !== parentCatId) {
                          setValue('categoryId', parentCatId, { shouldValidate: true })
                          dispatch(updateDraftUser({ categoryId: parentCatId }))
                        }
                      }
                    }}
                  />
                )
              }}
            />
            <div className={styles.buttonRow}>
              <ButtonUI
                type="button"
                variant="secondary"
                className={styles.actionButton}
                onClick={() => navigate('/register/step-1')}
              >
                Назад
              </ButtonUI>

              <ButtonUI type="submit" className={styles.actionButton} disabled={!isValid}>
                Продолжить
              </ButtonUI>
            </div>
          </form>
        </div>
        <aside
          className={`${authStyles.card} ${authStyles.supportCard}`}
          aria-label="Информация о шаге"
        >
          <div className={authStyles.supportContent}>
            <img
              src={step2Illustration}
              alt="Иллюстрация"
              className={styles.hintIcon}
              aria-hidden
            />
            <h2 className={authStyles.supportTitle}>Расскажите немного о себе</h2>
            <p className={authStyles.supportText}>
              Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default AuthStepSecondPage
