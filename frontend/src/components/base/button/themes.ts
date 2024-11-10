export type Theme =
  | 'white'
  | 'dark'
  | 'disabled'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'destructive'
  | 'info'

export type Look = 'solid' | 'ghost' | 'link' | 'border' | 'none'

type ButtonTheme = Record<Look, Record<Theme, string>>

export const themes: ButtonTheme = {
  solid: {
    white:
      'border border-transparent text-gray-400 bg-white hover:bg-gray-100 active:bg-gray-200 focus:text-gray-600',
    dark: 'border border-transparent text-white bg-gray-800 hover:bg-gray-700 active:bg-gray-700 focus:text-gray-200',
    disabled: 'border border-transparent text-gray-700 bg-gray-200',
    primary:
    'border border-transparent text-white bg-primary-700 hover:bg-primary-600 active:bg-primary-600 focus:ring-2',
    secondary:
      'border-2 border-transparent text-white bg-accent-600 hover:bg-accent-500 active:bg-accent-500 focus:ring-2',
    success:
      'border border-transparent text-white bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-600 focus:ring-2',
    destructive:
      'border border-transparent text-white bg-red-700 hover:bg-red-600 active:bg-red-600 focus:ring-2',
    info: 'border border-transparent text-white bg-blue-700 hover:bg-blue-600 active:bg-blue-600 focus:ring-2',
  },
  ghost: {
    white:
      'text-gray-600 bg-transparent hover:text-gray-700 hover:bg-gray-200 active:bg-gray-300',
    dark: 'text-white bg-transparent hover:text-gray-200',
    disabled: 'text-gray-400 bg-gray-100',
    primary:
      'text-primary-600 bg-primary-100 hover:text-primary-700 hover:bg-primary-200 active:bg-primary-300',
    secondary: '',
    success:
      'text-green-600 bg-green-100 hover:text-green-700 hover:bg-green-200 active:bg-green-300',
    destructive:
      'text-red-600 bg-red-100 hover:text-red-700 hover:bg-red-200 active:bg-red-300',
    info: 'text-blue-600 bg-blue-100 hover:text-blue-700 hover:bg-blue-200 active:bg-blue-300',
  },
  link: {
    white: 'text-gray-400 hover:text-gray-300 active:text-gray-300',
    dark: 'text-gray-600 hover:text-gray-500 active:text-gray-700',
    disabled: '',
    primary: 'text-primary hover:text-primary-700 active:text-primary-700',
    secondary: 'text-orange-500 hover:text-orange-400 active:text-orange-400',
    success: 'text-green-600 hover:text-green-500 active:text-green-700',
    destructive: 'text-red-600 hover:text-red-500 active:text-red-700',
    info: 'text-blue-600 hover:text-blue-500 active:text-blue-700',
  },
  border: {
    white:
      'border text-gray-600 bg-transparent border-gray-200 hover:bg-gray-100 active:border-gray-700 focus:ring-2',
    dark: '',
    disabled: 'border text-gray-500 bg-transparent border-gray-200',
    primary:
      'border text-primary bg-transparent border-primary hover:bg-primary-100 active:border-primary-800 focus:ring-2',
    secondary:
      'border text-accent bg-transparent border-accent-200 hover:bg-accent-100 active:border-accent-700 focus:ring-2',
    success:
      'border text-green-600 bg-transparent border-green-400 hover:bg-green-100 active:border-green-700 focus:ring-2',
    destructive:
      'border text-red-600 bg-transparent border-red-400 hover:bg-red-100 active:border-red-700 focus:ring-2',
    info: 'border-2 text-blue-600 bg-transparent border-blue-400 hover:bg-blue-100 active:border-blue-700 focus:ring-2',
  },
  none: {
    white: '',
    dark: '',
    disabled: '',
    primary: '',
    secondary: '',
    success: '',
    destructive: '',
    info: '',
  },
}

export const sizes = {
  xs: 'h-6 px-2 text-xs',
  sm: 'h-8 px-4 text-sm',
  md: 'h-10 px-5 text-base',
  lg: 'h-12 px-5 text-base',
  xl: 'h-14 px-6 text-lg',
  none: '',
}

export const justify = {
  center: 'justify-center',
  start: 'justify-start',
  end: 'justify-end',
  none: '',
}
export const rounded = {
  normal: 'rounded',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
  none: '',
}
