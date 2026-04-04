import { TextInput } from '../TextInput/TextInput'
import searchIcon from '../../../assets/icons/magnifier.png'
import styles from './SearchInput.module.css'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  isError?: boolean
  errorMessage?: string
  placeholder?: string
}

export const SearchInput = ({ value, onChange, ...props }: SearchInputProps) => {
  return (
    <TextInput
      {...props}
      value={value}
      onChange={onChange}
      type="text"
      leftSlot={<img src={searchIcon} alt="иконка поиска в виде лупы" />}
      withClearButton
      className={styles.searchInput}
    />
  )
}
