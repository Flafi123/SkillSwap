import React, { useRef } from 'react'
import styles from './PhotoInput.module.css'
import addIcon from '../../assets/icons/gallery-add.png'

export type PhotoInputProps = {
  value: File[]
  onChange: (files: File[]) => void
  onDelete?: (file: File) => void
  multiple?: boolean
  accept?: string
}

export const PhotoInput: React.FC<PhotoInputProps> = ({
  value,
  onChange,
  onDelete,
  multiple = true,
  accept,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const existing = new Set(value.map((f) => `${f.name}_${f.size}`))
    const uniqueFiles = files.filter((f) => !existing.has(`${f.name}_${f.size}`))
    const newFiles = [...value, ...uniqueFiles]

    onChange(newFiles)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleDelete = (file: File) => {
    const newFiles = value.filter((f) => !(f.name === file.name && f.size === file.size))
    onChange(newFiles)
    onDelete?.(file)
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.uploadBox}>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleSelect}
          className={styles.input}
        />
        <div className={styles.hint}>Перетащите или выберите изображения навыка</div>
        <span className={styles.uploadContent}>
          <img src={addIcon} alt="Выбрать изображения" className={styles.icon} />
          Выбрать изображения
        </span>
      </label>

      {value.length > 0 && (
        <ul className={styles.fileList}>
          {value.map((file) => (
            <li key={`${file.name}_${file.size}`} className={styles.fileItem}>
              <span className={styles.fileName}>{file.name}</span>
              <button type="button" className={styles.deleteBtn} onClick={() => handleDelete(file)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
