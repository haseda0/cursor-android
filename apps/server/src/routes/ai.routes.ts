import { Router, Request, Response, NextFunction } from 'express'
import { openaiService } from '../services/openai.service'
import { authMiddleware } from '../middleware/auth.middleware'
import { logger } from '../utils/logger'

const router = Router()

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatRequest {
  messages: Message[]
  model?: string
  temperature?: number
  max_tokens?: number
}

// POST /api/ai/chat - Real OpenAI chat
router.post('/chat', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { messages, model = 'gpt-3.5-turbo', temperature = 0.7, max_tokens = 2000 } = req.body as ChatRequest

    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: 'Messages required' })
    }

    logger.info(`Chat request with ${messages.length} messages`)

    const response = await openaiService.chat({
      messages,
      model,
      temperature,
      max_tokens,
    })

    res.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logger.error('Chat error:', error)
    next(error)
  }
})

// POST /api/ai/code-complete - Code completion
router.post('/code-complete', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, language = 'javascript', context = '' } = req.body

    if (!code) {
      return res.status(400).json({ error: 'Code required' })
    }

    const prompt = `Complete this ${language} code:\n\n${context}\n${code}\n\nProvide only the completion without explanation.`

    const response = await openaiService.chat({
      messages: [
        {
          role: 'system',
          content: `You are an expert ${language} developer. Complete code snippets accurately and efficiently.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.3,
      max_tokens: 500,
    })

    res.json({
      success: true,
      completion: response.content,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logger.error('Code completion error:', error)
    next(error)
  }
})

// POST /api/ai/refactor - Code refactoring
router.post('/refactor', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, language = 'javascript', instructions = '' } = req.body

    if (!code) {
      return res.status(400).json({ error: 'Code required' })
    }

    const prompt = `Refactor this ${language} code${instructions ? ` with these instructions: ${instructions}` : ''}:\n\n${code}\n\nProvide the refactored code with brief explanation.`

    const response = await openaiService.chat({
      messages: [
        {
          role: 'system',
          content: `You are an expert code refactorer. Improve code quality, readability, and performance. Always provide clean, production-ready code.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
      max_tokens: 2000,
    })

    res.json({
      success: true,
      refactored: response.content,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logger.error('Refactor error:', error)
    next(error)
  }
})

// POST /api/ai/debug - Code debugging
router.post('/debug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, error: errorMsg, language = 'javascript' } = req.body

    if (!code || !errorMsg) {
      return res.status(400).json({ error: 'Code and error message required' })
    }

    const prompt = `Debug this ${language} code:\n\nCode:\n${code}\n\nError:\n${errorMsg}\n\nProvide the fix and explanation.`

    const response = await openaiService.chat({
      messages: [
        {
          role: 'system',
          content: `You are an expert debugger. Analyze code and errors to provide accurate fixes with clear explanations.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.3,
      max_tokens: 2000,
    })

    res.json({
      success: true,
      fix: response.content,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logger.error('Debug error:', error)
    next(error)
  }
})

// GET /api/ai/models - Available models
router.get('/models', (req: Request, res: Response) => {
  res.json({
    success: true,
    models: [
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', speed: 'Fast', cost: 'Cheap' },
      { id: 'gpt-4', name: 'GPT-4', speed: 'Slow', cost: 'Expensive' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', speed: 'Medium', cost: 'Medium' },
    ],
  })
})

export default router
