export interface InputProps {
  type?: 'text' | 'password' | 'textarea'
  size?: 'large' | 'small'
  clearable?: boolean
  showPassword?: boolean
  disabled?: boolean
}

export interface InputEmits {
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'clear'): void
  (e: 'focus'): void
  (e: 'blur'): void
}
