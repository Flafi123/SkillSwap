import { useEffect, useMemo, useRef } from 'react'
import type { ChangeEvent } from 'react'
import styles from './AvatarInput.module.css'
import avatarIcon from '../../assets/svg/avatar-icon.svg'

interface AvatarInputProps {
  value: File | string | null
  onChange: (file: File | null) => void
}

export const AvatarInput = ({ value, onChange }: AvatarInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const preview = useMemo(() => {
    if (!value) return null
    if (typeof value === 'string') return value
    // Если это файл, создаем временную ссылку
    return URL.createObjectURL(value)
  }, [value])

  // cleanup
  useEffect(() => {
    return () => {
      // 3. УДАЛЯЕМ ТОЛЬКО ВРЕМЕННЫЕ ССЫЛКИ, А НЕ СТРОКИ С БЭКЕНДА
      if (preview && typeof value !== 'string') {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview, value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    onChange(file)
    e.target.value = ''
  }

  return (
    <button type="button" className={styles.avatarInput} onClick={() => inputRef.current?.click()}>
      <span className={styles.avatarWrapper}>
        {preview ? (
          <img src={preview} alt="Аватар" className={styles.image} />
        ) : (
          <img src={avatarIcon} alt="Аватар пользователя" className={styles.icon} />
        )}

        <span className={styles.plus}></span>
      </span>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className={styles.input}
      />
    </button>
  )
}
