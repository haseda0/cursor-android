import { useCallback } from 'react'
import { toast as toastify, ToastOptions } from 'react-toastify'

interface ToastParams extends ToastOptions {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}

export const useToast = () => {
  const toast = useCallback((params: ToastParams) => {
    const { type, message, ...options } = params
    toastify[type](message, options)
  }, [])

  return { toast }
}
