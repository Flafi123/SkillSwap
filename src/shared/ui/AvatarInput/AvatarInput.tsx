import { useEffect, useMemo, useRef } from 'react'
import type { ChangeEvent } from 'react'
import styles from './AvatarInput.module.css'
import avatarIcon from '../../assets/svg/avatar-icon.svg'

interface AvatarInputProps {
  value: File | null
  onChange: (file: File | null) => void
}

export const AvatarInput = ({ value, onChange }: AvatarInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const preview = useMemo(() => {
    if (!value) return null
    return URL.createObjectURL(value)
  }, [value])

  // cleanup
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

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
