import { useCallback } from 'react'
import axios, { AxiosError } from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/useToast'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const useApi = () => {
  const { toast } = useToast()

  const handleError = useCallback(
    (error: AxiosError<any>) => {
      const message = error.response?.data?.message || 'An error occurred'
      toast({ type: 'error', message })
    },
    [toast]
  )

  return { api, handleError }
}

export default api
