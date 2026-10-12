import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from './errorHandler'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      const error: AppError = new Error('No token provided')
      error.status = 401
      throw error
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      id: string
      email: string
    }
    req.user = decoded
    next()
  } catch (error) {
    const err: AppError = new Error('Invalid token')
    err.status = 401
    next(err)
  }
}
