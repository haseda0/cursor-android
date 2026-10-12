import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import axios from 'axios'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 3001

// Security Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use('/api/', limiter)

// Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Types
interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatRequest {
  messages: ChatMessage[]
  model?: string
  temperature?: number
  max_tokens?: number
}

interface ChatResponse {
  success: boolean
  data?: string
  error?: string
}

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Main Chat Endpoint - with proxy to OpenAI
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, model = 'gpt-3.5-turbo', temperature = 0.7, max_tokens = 1000 } = req.body as ChatRequest

    // Validate
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid messages format',
      })
    }

    // Security: Check if backend has API key
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'OpenAI API key not configured',
      })
    }

    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model,
        messages,
        temperature,
        max_tokens,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const aiResponse = response.data.choices[0].message.content
    res.json({
      success: true,
      data: aiResponse,
    })
  } catch (error: any) {
    console.error('Chat error:', error.message)
    res.status(500).json({
      success: false,
      error: error.response?.data?.error?.message || 'Failed to process chat',
    })
  }
})

// Code Analysis Endpoint
app.post('/api/analyze-code', async (req: Request, res: Response) => {
  try {
    const { code, language = 'javascript' } = req.body

    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'Code is required',
      })
    }

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `You are a code review expert. Analyze the following ${language} code and provide:
1. Potential bugs or issues
2. Performance improvements
3. Best practices
4. Security concerns
Be concise and actionable.`,
      },
      {
        role: 'user',
        content: `Analyze this code:\n\n\`\`\`${language}\n${code}\n\`\`\``,
      },
    ]

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.5,
        max_tokens: 1500,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    res.json({
      success: true,
      data: response.data.choices[0].message.content,
    })
  } catch (error: any) {
    console.error('Analysis error:', error.message)
    res.status(500).json({
      success: false,
      error: 'Failed to analyze code',
    })
  }
})

// Generate Code Endpoint
app.post('/api/generate-code', async (req: Request, res: Response) => {
  try {
    const { prompt, language = 'typescript' } = req.body

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required',
      })
    }

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `You are an expert ${language} developer. Generate clean, production-ready code based on the user's request. Always include comments and follow best practices.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ]

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    res.json({
      success: true,
      data: response.data.choices[0].message.content,
    })
  } catch (error: any) {
    console.error('Generation error:', error.message)
    res.status(500).json({
      success: false,
      error: 'Failed to generate code',
    })
  }
})

// Explain Code Endpoint
app.post('/api/explain-code', async (req: Request, res: Response) => {
  try {
    const { code, language = 'javascript', level = 'intermediate' } = req.body

    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'Code is required',
      })
    }

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `You are a code educator. Explain the following code in a ${level} level manner. Be clear and include examples if needed.`,
      },
      {
        role: 'user',
        content: `Explain this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``,
      },
    ]

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 1200,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    res.json({
      success: true,
      data: response.data.choices[0].message.content,
    })
  } catch (error: any) {
    console.error('Explanation error:', error.message)
    res.status(500).json({
      success: false,
      error: 'Failed to explain code',
    })
  }
})

// Error Handler
app.use((err: any, req: Request, res: Response) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  })
})

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`)
})
