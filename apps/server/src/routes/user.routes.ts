import { Router, Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { logger } from '../utils/logger'

const router = Router()

const USERS: Record<string, any> = {}

interface SignupRequest {
  email: string
  password: string
  name: string
}

interface LoginRequest {
  email: string
  password: string
}

// POST /api/users/signup
router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name }: SignupRequest = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name required' })
    }

    if (USERS[email]) {
      return res.status(409).json({ error: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = Date.now().toString()

    USERS[email] = {
      id: userId,
      email,
      name,
      password: hashedPassword,
      createdAt: new Date(),
    }

    const token = jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      success: true,
      data: { id: userId, email, name },
      token,
    })
  } catch (error) {
    logger.error('Signup error:', error)
    next(error)
  }
})

// POST /api/users/login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password }: LoginRequest = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const user = USERS[email]
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      data: { id: user.id, email: user.email, name: user.name },
      token,
    })
  } catch (error) {
    logger.error('Login error:', error)
    next(error)
  }
})

// GET /api/users/profile
router.get('/profile', (req: Request, res: Response) => {
  const user = req.user
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  res.json({ success: true, data: user })
})

export default router
