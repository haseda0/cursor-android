import { Router, Request, Response, NextFunction } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { logger } from '../utils/logger'

const router = Router()

// Protected routes - require auth
router.use(authMiddleware)

// GET /api/projects - List user projects
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id

    // TODO: Fetch from database
    const projects = [
      {
        id: '1',
        name: 'My First Project',
        description: 'First coding project',
        language: 'javascript',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    res.json({ success: true, data: projects })
  } catch (error) {
    logger.error('Get projects error:', error)
    next(error)
  }
})

// POST /api/projects - Create project
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, language } = req.body
    const userId = req.user?.id

    if (!name) {
      return res.status(400).json({ error: 'Project name required' })
    }

    // TODO: Save to database
    const project = {
      id: Date.now().toString(),
      name,
      description,
      language: language || 'javascript',
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    res.status(201).json({ success: true, data: project })
  } catch (error) {
    logger.error('Create project error:', error)
    next(error)
  }
})

// GET /api/projects/:id - Get project
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    // TODO: Fetch from database
    const project = {
      id,
      name: 'Project Name',
      description: 'Project description',
      code: '',
      language: 'javascript',
    }

    res.json({ success: true, data: project })
  } catch (error) {
    logger.error('Get project error:', error)
    next(error)
  }
})

// PUT /api/projects/:id - Update project
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { name, code, description } = req.body

    // TODO: Update in database
    const project = {
      id,
      name,
      code,
      description,
      updatedAt: new Date(),
    }

    res.json({ success: true, data: project })
  } catch (error) {
    logger.error('Update project error:', error)
    next(error)
  }
})

// DELETE /api/projects/:id - Delete project
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const userId = req.user?.id

    // TODO: Delete from database
    res.json({ success: true, message: 'Project deleted' })
  } catch (error) {
    logger.error('Delete project error:', error)
    next(error)
  }
})

export default router
