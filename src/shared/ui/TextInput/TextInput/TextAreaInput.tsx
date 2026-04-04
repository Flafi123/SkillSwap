import { useRef, useEffect } from 'react'
import styles from './TextInput.module.css'
import clsx from 'clsx'

interface TextAreaInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  isError?: boolean
  warningMessage?: string
  placeholder?: string
  className?: string
}

export const TextAreaInput = ({
  value,
  onChange,
  label,
  isError,
  warningMessage,
  placeholder,
  className,
}: TextAreaInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    const element = textareaRef.current
    if (element) {
      element.style.height = 'auto'
      element.style.height = element.scrollHeight + 'px'
    }
  }, [value])
  return (
    <label className={styles.mainContainer}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.inputContainer}>
        <textarea
          className={clsx(styles.input, isError && styles.errorInput, styles.textarea, className)}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          ref={textareaRef}
        />
      </div>

      {warningMessage && (
        <span className={clsx(styles.warningMessage, isError && styles.warningMessageFocus)}>
          {warningMessage}
        </span>
      )}
    </label>
  )
}
