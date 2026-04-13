import clsx from 'clsx'
import { useEffect, useMemo, useRef } from 'react'
import type { ChangeEvent } from 'react'
import avatarIcon from '../../assets/svg/avatar-icon.svg'
import galleryAddIcon from '../../assets/icons/gallery-add.png'
import styles from './EditAvatar.module.css'

interface EditAvatarProps {
  value: File | null
  onChange: (file: File | null) => void
  avatarUrl?: string | null
  alt?: string
  className?: string
  ariaLabel?: string
}

export const EditAvatar = ({
  value,
  onChange,
  avatarUrl = null,
  alt = 'Аватар пользователя',
  className,
  ariaLabel = 'Изменить фото профиля',
}: EditAvatarProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const preview = useMemo(() => {
    if (value) {
      return URL.createObjectURL(value)
    }

    return avatarUrl
  }, [avatarUrl, value])

  useEffect(() => {
    if (!value || !preview) {
      return
    }

    return () => {
      URL.revokeObjectURL(preview)
    }
  }, [preview, value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    onChange(file)
    e.target.value = ''
  }

  return (
    <button
      type="button"
      className={clsx(styles.editAvatar, className)}
      onClick={() => inputRef.current?.click()}
      aria-label={ariaLabel}
    >
      <span className={styles.avatarWrapper}>
        {preview ? (
          <img src={preview} alt={alt} className={styles.avatarImage} />
        ) : (
          <span className={styles.avatarFallback}>
            <img src={avatarIcon} alt={alt} className={styles.avatarIcon} />
          </span>
        )}

        <span className={styles.editButton} aria-hidden="true">
          <img src={galleryAddIcon} alt="" className={styles.editIcon} />
        </span>
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
