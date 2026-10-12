'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles, Copy, RefreshCw } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { useApi } from '@/hooks/useApi'
import { ChatSession, AIMessage } from '@/types'

interface AIChatPanelProps {
  projectId: string
}

export const AIChatPanel: React.FC<AIChatPanelProps> = ({ projectId }) => {
  const { currentFile } = useEditorStore()
  const { api } = useApi()
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      codeContext: currentFile?.content,
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await api.post('/ai/chat', {
        message: input,
        projectId,
        codeContext: currentFile?.content,
        language: currentFile?.language,
      })

      const aiMessage: AIMessage = {
        id: response.data.id,
        role: 'assistant',
        content: response.data.content,
        createdAt: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-950 border-l border-slate-800">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <h3 className="text-sm font-semibold text-slate-100">AI Assistant</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Sparkles className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm text-center">Ask AI for code help, explanations, or generate code</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-100'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </motion.div>
          ))
        )}
        {loading && (
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-800 bg-slate-900 p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask AI..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChatPanel
