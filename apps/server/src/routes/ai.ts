import { Router, Response } from 'express'
import axios from 'axios'
import { authenticate, AuthRequest } from '../middleware/auth'
import { logger } from '../utils/logger'

export const aiRouter = Router()

interface AIRequestBody {
  message: string
  projectId: string
  codeContext?: string
  language?: string
}

const callAI = async (prompt: string): Promise<string> => {
  try {
    // Using OpenAI API (can be changed to Gemini, Claude, etc.)
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('AI API key not configured')
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return response.data.choices[0].message.content
  } catch (error) {
    logger.error('AI API error:', error)
    throw error
  }
}

// Chat with AI
aiRouter.post('/chat', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { message, codeContext, language } = req.body as AIRequestBody

    if (!message) {
      return res.status(400).json({ message: 'Message is required' })
    }

    const prompt = codeContext
      ? `You are an expert code assistant. Help with the following code (${language || 'unknown'}):\n\nCode:\n${codeContext}\n\nUser question: ${message}`
      : `You are an expert code assistant. ${message}`

    const aiResponse = await callAI(prompt)

    res.json({
      id: Date.now().toString(),
      content: aiResponse,
      role: 'assistant',
    })
  } catch (error) {
    logger.error('Error in AI chat:', error)
    res.status(500).json({ message: 'Error communicating with AI' })
  }
})

// Generate code
aiRouter.post('/generate', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { description, language = 'javascript' } = req.body

    if (!description) {
      return res.status(400).json({ message: 'Description is required' })
    }

    const prompt = `Generate ${language} code based on this requirement:\n${description}\n\nProvide only the code without explanations.`
    const code = await callAI(prompt)

    res.json({
      code,
      language,
    })
  } catch (error) {
    logger.error('Error generating code:', error)
    res.status(500).json({ message: 'Error generating code' })
  }
})

// Explain code
aiRouter.post('/explain', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { code, language = 'javascript' } = req.body

    if (!code) {
      return res.status(400).json({ message: 'Code is required' })
    }

    const prompt = `Explain this ${language} code clearly and concisely:\n${code}`
    const explanation = await callAI(prompt)

    res.json({
      explanation,
    })
  } catch (error) {
    logger.error('Error explaining code:', error)
    res.status(500).json({ message: 'Error explaining code' })
  }
})

// Refactor code
aiRouter.post('/refactor', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { code, language = 'javascript' } = req.body

    if (!code) {
      return res.status(400).json({ message: 'Code is required' })
    }

    const prompt = `Refactor this ${language} code to improve readability, performance, and maintainability. Provide only the refactored code:\n${code}`
    const refactored = await callAI(prompt)

    res.json({
      code: refactored,
      language,
    })
  } catch (error) {
    logger.error('Error refactoring code:', error)
    res.status(500).json({ message: 'Error refactoring code' })
  }
})
