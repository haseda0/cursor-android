import OpenAI from 'openai'
import { logger } from '../utils/logger'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface ChatParams {
  messages: any[]
  model: string
  temperature: number
  max_tokens: number
}

interface ChatResponse {
  content: string
  model: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export const openaiService = {
  async chat(params: ChatParams): Promise<ChatResponse> {
    try {
      logger.info(`Calling OpenAI ${params.model}...`)

      const response = await client.chat.completions.create({
        model: params.model,
        messages: params.messages,
        temperature: params.temperature,
        max_tokens: params.max_tokens,
      })

      const content = response.choices[0]?.message?.content || ''

      return {
        content,
        model: params.model,
        usage: {
          prompt_tokens: response.usage?.prompt_tokens || 0,
          completion_tokens: response.usage?.completion_tokens || 0,
          total_tokens: response.usage?.total_tokens || 0,
        },
      }
    } catch (error) {
      logger.error('OpenAI API error:', error)
      throw error
    }
  },
}
