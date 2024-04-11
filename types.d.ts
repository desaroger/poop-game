import { SnackbarProviderProps } from 'notistack'
import { FC, ReactNode } from 'react'

declare module 'notistack' {
  export function SnackbarProvider(props: SnackbarProviderProps): ReactNode
}
