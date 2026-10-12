import { Router, Response } from 'express'
import { prisma } from '../database/client'
import { authenticate, AuthRequest } from '../middleware/auth'
import { logger } from '../utils/logger'

export const projectRouter = Router()

// Get all projects
projectRouter.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user?.id },
      include: { files: true },
      orderBy: { createdAt: 'desc' },
    })

    res.json(projects)
  } catch (error) {
    logger.error('Error fetching projects:', error)
    res.status(500).json({ message: 'Error fetching projects' })
  }
})

// Get project by ID
projectRouter.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: { files: true },
    })

    if (!project || project.userId !== req.user?.id) {
      return res.status(404).json({ message: 'Project not found' })
    }

    res.json(project)
  } catch (error) {
    logger.error('Error fetching project:', error)
    res.status(500).json({ message: 'Error fetching project' })
  }
})

// Create project
projectRouter.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, language } = req.body

    const project = await prisma.project.create({
      data: {
        name,
        description,
        language: language || 'javascript',
        userId: req.user?.id!,
      },
    })

    logger.info(`Project created: ${project.id}`)

    res.status(201).json(project)
  } catch (error) {
    logger.error('Error creating project:', error)
    res.status(500).json({ message: 'Error creating project' })
  }
})

// Update project
projectRouter.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description } = req.body

    const project = await prisma.project.findUnique({ where: { id: req.params.id } })
    if (!project || project.userId !== req.user?.id) {
      return res.status(404).json({ message: 'Project not found' })
    }

    const updated = await prisma.project.update({
      where: { id: req.params.id },
      data: { name, description },
    })

    res.json(updated)
  } catch (error) {
    logger.error('Error updating project:', error)
    res.status(500).json({ message: 'Error updating project' })
  }
})

// Delete project
projectRouter.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const project = await prisma.project.findUnique({ where: { id: req.params.id } })
    if (!project || project.userId !== req.user?.id) {
      return res.status(404).json({ message: 'Project not found' })
    }

    await prisma.project.delete({ where: { id: req.params.id } })
    logger.info(`Project deleted: ${req.params.id}`)

    res.json({ message: 'Project deleted' })
  } catch (error) {
    logger.error('Error deleting project:', error)
    res.status(500).json({ message: 'Error deleting project' })
  }
})
