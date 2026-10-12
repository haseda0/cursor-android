'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Settings, Code2, Copy, Check, Zap, Sparkles, RotateCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type?: 'chat' | 'analysis' | 'generation' | 'explanation'
}

type ActionMode = 'chat' | 'analyze' | 'generate' | 'explain'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const Editor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '🚀 Selamat datang di Cursor AI! Saya adalah AI Code Assistant dengan OpenAI Integration yang real. Apa yang bisa saya bantu?',
      timestamp: new Date(),
      type: 'chat',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('// Tulis kode kamu di sini\nfunction hello() {\n  console.log("Hello, Cursor AI!");\n}')
  const [copied, setCopied] = useState(false)
  const [actionMode, setActionMode] = useState<ActionMode>('chat')
  const [language, setLanguage] = useState('javascript')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [stats, setStats] = useState({ messages: 0, analyzed: 0, generated: 0 })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setStats({ messages: messages.length, analyzed: 0, generated: 0 })
  }, [messages])

  const callAPI = async (endpoint: string, data: any): Promise<string> => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'API request failed')
      }

      const result = await response.json()
      return result.data
    } catch (error: any) {
      console.error('API Error:', error.message)
      throw error
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      type: actionMode,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      let aiResponse: string

      switch (actionMode) {
        case 'analyze':
          aiResponse = await callAPI('/api/analyze-code', {
            code,
            language,
          })
          break
        case 'generate':
          aiResponse = await callAPI('/api/generate-code', {
            prompt: input,
            language,
          })
          break
        case 'explain':
          aiResponse = await callAPI('/api/explain-code', {
            code,
            language,
            level: 'intermediate',
          })
          break
        default:
          const messages = [
            {
              role: 'system',
              content: 'You are an expert code assistant. Help with coding questions, debugging, and code generation.',
            },
            { role: 'user', content: input },
          ]
          aiResponse = await callAPI('/api/chat', { messages })
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        type: actionMode,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ Error: ${error.message}. Pastikan backend server running di ${API_URL}`,
        timestamp: new Date(),
        type: actionMode,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const actionButtons = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'analyze', label: 'Analyze', icon: Zap },
    { id: 'generate', label: 'Generate', icon: Sparkles },
    { id: 'explain', label: 'Explain', icon: Code2 },
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-slate-800 bg-slate-950/80 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h2 className="font-bold text-sm mb-2">MODE</h2>
          <div className="space-y-2">
            {actionButtons.map((btn) => {
              const Icon = btn.icon
              return (
                <button
                  key={btn.id}
                  onClick={() => setActionMode(btn.id as ActionMode)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                    actionMode === btn.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {btn.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-4 border-b border-slate-800">
          <h2 className="font-bold text-sm mb-2">LANGUAGE</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="rust">Rust</option>
            <option value="go">Go</option>
          </select>
        </div>

        <div className="p-4 border-b border-slate-800 flex-1">
          <h2 className="font-bold text-sm mb-3">STATS</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Messages:</span>
              <span className="text-blue-400">{stats.messages}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Analyzed:</span>
              <span className="text-green-400">{stats.analyzed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Generated:</span>
              <span className="text-purple-400">{stats.generated}</span>
            </div>
          </div>
        </div>

        <div className="p-4 text-xs text-slate-500">
          <p>API URL: {API_URL}</p>
          <p className="mt-2">Backend must be running for AI features</p>
        </div>
      </div>

      {/* Editor Panel */}
      <div className="flex-1 flex flex-col border-r border-slate-800">
        {/* Header */}
        <div className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">Code Editor</span>
          </div>
          <button
            onClick={copyCode}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 transition text-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col overflow-hidden p-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 resize-none"
            spellCheck="false"
          />
        </div>
      </div>

      {/* AI Chat Panel */}
      <div className="w-96 flex flex-col bg-slate-900/50 border-l border-slate-800">
        {/* Chat Header */}
        <div className="h-14 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50">
          <span className="font-semibold">AI Assistant</span>
          <button className="p-2 hover:bg-slate-800 rounded-lg transition">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : msg.type === 'analysis'
                      ? 'bg-yellow-900/40 text-yellow-100'
                      : msg.type === 'generation'
                      ? 'bg-purple-900/40 text-purple-100'
                      : msg.type === 'explanation'
                      ? 'bg-green-900/40 text-green-100'
                      : 'bg-slate-800 text-slate-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words max-w-xs">
                    {msg.content}
                  </p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {msg.timestamp.toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-slate-800 px-4 py-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-800 p-4 bg-slate-900/50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder={`${actionMode === 'chat' ? 'Tanya AI...' : actionMode.charAt(0).toUpperCase() + actionMode.slice(1) + '...'}`}
              disabled={loading}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <RotateCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
