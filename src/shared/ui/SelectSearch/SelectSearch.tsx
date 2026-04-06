import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import styles from './SelectSearch.module.css'
import { CloseIcon } from '../../assets/icons'

export interface SelectSearchProps {
  className?: string
  label?: string
  placeholder?: string
  options?: string[]
  value?: string
  onChange?: (value: string | string[]) => void
}

export const SelectSearch: React.FC<SelectSearchProps> = (props) => {
  const { options = [], onChange, placeholder, label, value = '', className } = props
  const [inputValue, setInputValue] = useState(value)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const normalizedQuery = inputValue.trim()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredOptions = useMemo(() => {
    if (!normalizedQuery) {
      return []
    }

    return options.filter((option) =>
      option.toLowerCase().startsWith(normalizedQuery.toLowerCase()),
    )
  }, [options, normalizedQuery])

  const shouldShowDropdown = isOpen && normalizedQuery.length > 0

  const handleClear = () => {
    setInputValue('')
    setIsOpen(false)
    onChange?.('')
    inputRef.current?.focus()
  }

  const handleInputChange = (nextValue: string) => {
    setInputValue(nextValue)
    setIsOpen(nextValue.trim().length > 0)
    onChange?.(nextValue)
  }

  const handleSelect = (option: string) => {
    setInputValue(option)
    setIsOpen(false)
    onChange?.(option)
  }

  return (
    <div className={clsx(styles.mainContainer, className)} ref={containerRef}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}

      <div className={clsx(styles.field, shouldShowDropdown && styles.fieldOpen)}>
        <div className={styles.inputContainer}>
          <input
            ref={inputRef}
            id={inputId}
            className={styles.input}
            value={inputValue}
            placeholder={placeholder}
            autoComplete="off"
            onChange={(event) => handleInputChange(event.target.value)}
            onFocus={() => {
              if (normalizedQuery) {
                setIsOpen(true)
              }
            }}
          />

          <div className={styles.rightSlots}>
            {inputValue && (
              <button
                type="button"
                className={styles.iconButton}
                onClick={handleClear}
                aria-label="Очистить поле"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        </div>

        {shouldShowDropdown && (
          <ul className={styles.dropdown}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    className={styles.option}
                    onMouseDown={() => handleSelect(option)}
                  >
                    {option}
                  </button>
                </li>
              ))
            ) : (
              <li className={styles.notFound}>Ничего не найдено</li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
