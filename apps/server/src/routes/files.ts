import { Router, Response } from 'express'
import { prisma } from '../database/client'
import { authenticate, AuthRequest } from '../middleware/auth'
import { logger } from '../utils/logger'

export const fileRouter = Router()

// Create file
fileRouter.post('/:projectId/files', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { name, content = '' } = req.body
    const { projectId } = req.params

    const project = await prisma.project.findUnique({ where: { id: projectId } })
    if (!project || project.userId !== req.user?.id) {
      return res.status(404).json({ message: 'Project not found' })
    }

    const file = await prisma.projectFile.create({
      data: {
        name,
        content,
        projectId,
        language: detectLanguage(name),
        path: `/${name}`,
      },
    })

    logger.info(`File created: ${file.id}`)
    res.status(201).json(file)
  } catch (error) {
    logger.error('Error creating file:', error)
    res.status(500).json({ message: 'Error creating file' })
  }
})

// Update file
fileRouter.put('/:fileId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { content } = req.body

    const file = await prisma.projectFile.findUnique({ where: { id: req.params.fileId } })
    if (!file) {
      return res.status(404).json({ message: 'File not found' })
    }

    const project = await prisma.project.findUnique({ where: { id: file.projectId } })
    if (project?.userId !== req.user?.id) {
      return res.status(403).json({ message: 'Access denied' })
    }

    const updated = await prisma.projectFile.update({
      where: { id: req.params.fileId },
      data: { content },
    })

    res.json(updated)
  } catch (error) {
    logger.error('Error updating file:', error)
    res.status(500).json({ message: 'Error updating file' })
  }
})

// Delete file
fileRouter.delete('/:fileId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const file = await prisma.projectFile.findUnique({ where: { id: req.params.fileId } })
    if (!file) {
      return res.status(404).json({ message: 'File not found' })
    }

    const project = await prisma.project.findUnique({ where: { id: file.projectId } })
    if (project?.userId !== req.user?.id) {
      return res.status(403).json({ message: 'Access denied' })
    }

    await prisma.projectFile.delete({ where: { id: req.params.fileId } })
    logger.info(`File deleted: ${req.params.fileId}`)

    res.json({ message: 'File deleted' })
  } catch (error) {
    logger.error('Error deleting file:', error)
    res.status(500).json({ message: 'Error deleting file' })
  }
})

function detectLanguage(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  const map: Record<string, string> = {
    js: 'javascript',
    ts: 'typescript',
    py: 'python',
    java: 'java',
    cpp: 'cpp',
    go: 'go',
    rs: 'rust',
    jsx: 'javascript',
    tsx: 'typescript',
  }
  return map[ext!] || 'text'
}
