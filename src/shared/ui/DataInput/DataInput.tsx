import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import AirDatepicker from 'air-datepicker'
import localeRu from 'air-datepicker/locale/ru'
import 'air-datepicker/air-datepicker.css'

// Импортируем компоненты и стили проекта
import { TextInput } from '../TextInput/TextInput/TextInput'
import buttonStyles from '../Button/Button.module.css'
import styles from './DataInput.module.css'
import calendarIcon from '../../assets/icons/calendarIcon.svg'

interface DataInputProps {
  label?: string
  error?: string
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  minDate?: Date | string | number
  maxDate?: Date | string | number
}

export const DataInput = forwardRef<HTMLInputElement, DataInputProps>(
  (
    {
      label,
      error,
      value,
      onChange,
      placeholder = 'Выберите дату',
      minDate, // ДОБАВЛЕНО: достаем из пропсов
      maxDate,
      ...props
    },
    ref,
  ) => {
    // Внутренний ref для привязки календаря
    const inputRef = useRef<HTMLInputElement>(null)

    // Прокидываем ref наружу для react-hook-form
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    useEffect(() => {
      if (!inputRef.current) return

      // Инициализация календаря
      const dp = new AirDatepicker(inputRef.current, {
        locale: localeRu,
        autoClose: false, // Закрывается только по кнопке
        isMobile: false,
        minDate,
        maxDate,
        onSelect: ({ formattedDate }) => {
          // Если выбран диапазон дат, это массив. Нам нужна первая строка.
          const dateStr = Array.isArray(formattedDate) ? formattedDate[0] : formattedDate
          if (onChange && dateStr) {
            onChange(dateStr)
          }
        },
        buttons: [
          {
            content: 'Отменить',
            className: `${buttonStyles.button} ${buttonStyles.secondary}`,
            onClick: (inst) => inst.hide(),
          },
          {
            content: 'Выбрать',
            className: `${buttonStyles.button} ${buttonStyles.primary}`,
            onClick: (inst) => inst.hide(),
          },
        ],
      })

      // Очистка при размонтировании
      return () => {
        dp.destroy()
      }
    }, [onChange])

    const icon = <img src={calendarIcon} alt="Календарь" width="20" height="20" />

    return (
      <div className={styles.wrapper}>
        <TextInput
          ref={inputRef}
          label={label}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          isError={!!error}
          warningMessage={error}
          rightSlot={icon}
          readOnly
          {...props}
        />
      </div>
    )
  },
)

DataInput.displayName = 'DataInput'
