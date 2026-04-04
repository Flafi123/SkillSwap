import { useState } from 'react'
import { TextInput } from '../TextInput/TextInput'
import styles from './PasswordInput.module.css'
import eyeIcon from '../../../assets/icons/eye.png'
import eyeSlashIcon from '../../../assets/icons/eye-slash.png'

interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  isError?: boolean
  placeholder?: string
  warningMessage?: string
}

export const PasswordInput = ({
  value,
  onChange,
  label = 'Пароль',
  isError,
  placeholder = 'Придумайте надежный пароль',
  warningMessage = 'Пароль должен содержать не менее 8 знаков',
  ...props
}: PasswordInputProps) => {
  const [visible, setVisible] = useState(true)

  return (
    <TextInput
      {...props}
      value={value}
      onChange={onChange}
      type={visible ? 'text' : 'password'}
      label={label}
      isError={isError}
      warningMessage={warningMessage}
      placeholder={placeholder}
      className={styles.passwordInput}
      rightSlot={
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => setVisible((prev) => !prev)}
        >
          <img src={visible ? eyeIcon : eyeSlashIcon} alt="глазик показать/скрыть пароль" />
        </button>
      }
    />
  )
}
