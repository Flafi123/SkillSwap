import { type ChangeEvent, type ReactNode } from 'react'
import clsx from 'clsx'
import styles from './TextInput.module.css'
import crossIcon from '../../../assets/icons/cross.png'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  isError?: boolean
  warningMessage?: string
  rightSlot?: ReactNode
  leftSlot?: ReactNode
  placeholder?: string
  className?: string
  withClearButton?: boolean // Указываем, если нужна кнопка очистки по умолчанию
  type?: 'text' | 'password'
}

export const TextInput = ({
  value,
  onChange,
  label,
  isError,
  warningMessage,
  rightSlot,
  leftSlot,
  type = 'text',
  placeholder,
  className,
  withClearButton = false,
  ...props
}: TextInputProps) => {
  return (
    <label className={styles.mainContainer}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.inputContainer}>
        {leftSlot && <div className={styles.leftSlot}>{leftSlot}</div>}
        <input
          className={clsx(
            styles.input,
            isError && styles.errorInput,
            className,
            leftSlot && styles.shrinkInput,
          )}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          {...props}
        />

        {rightSlot && <div className={styles.rightSlot}>{rightSlot}</div>}
        {withClearButton && value && (
          <div className={styles.rightSlot}>
            <button type="button" className={styles.iconButton} onClick={() => onChange('')}>
              <img className={styles.icon} src={crossIcon} alt="крестик очистить поле" />
            </button>
          </div>
        )}
      </div>

      {warningMessage && (
        <span className={clsx(styles.warningMessage, isError && styles.warningMessageFocus)}>
          {warningMessage}
        </span>
      )}
    </label>
  )
}
