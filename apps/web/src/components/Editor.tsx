'use client'

import React, { useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { useEditorStore } from '@/store/editorStore'
import { useApi } from '@/hooks/useApi'

interface EditorProps {
  theme?: 'light' | 'dark'
}

export const CodeEditor: React.FC<EditorProps> = ({ theme = 'dark' }) => {
  const { currentFile, updateFile, setUnsavedChanges } = useEditorStore()
  const { api } = useApi()

  const handleEditorChange = useCallback(
    (value: string | undefined) => {
      if (value !== undefined && currentFile) {
        updateFile(currentFile.id, value)
      }
    },
    [currentFile, updateFile]
  )

  const handleSave = useCallback(async () => {
    if (!currentFile) return

    try {
      await api.put(`/files/${currentFile.id}`, {
        content: currentFile.content,
      })
      setUnsavedChanges(false)
    } catch (error) {
      console.error('Error saving file:', error)
    }
  }, [currentFile, api, setUnsavedChanges])

  if (!currentFile) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-slate-950 text-slate-300">
        <p className="text-lg">Select a file to start editing</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
        <span className="text-sm text-slate-300">{currentFile.name}</span>
        <button
          onClick={handleSave}
          className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
      <Editor
        height="100%"
        language={currentFile.language}
        value={currentFile.content}
        onChange={handleEditorChange}
        theme={theme === 'dark' ? 'vs-dark' : 'vs'}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: '"Fira Code", monospace',
          lineHeight: 1.6,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          folding: true,
          glyphMargin: true,
          lineNumbers: 'on',
          rulers: [80, 120],
        }}
      />
    </div>
  )
}

export default CodeEditor
