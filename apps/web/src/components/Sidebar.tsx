'use client'

import React from 'react'
import { FileText, Folder, Settings, Plus } from 'lucide-react'
import { useEditorStore } from '@/store/editorStore'
import { Project, ProjectFile } from '@/types'

interface SidebarProps {
  project: Project | null
  onNewFile: () => void
  onFileSelect: (file: ProjectFile) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ project, onNewFile, onFileSelect }) => {
  const { currentFile } = useEditorStore()

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
      {/* Project Header */}
      <div className="bg-slate-800 p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-amber-400" />
          <h2 className="font-semibold text-white truncate">{project?.name || 'No Project'}</h2>
        </div>
      </div>

      {/* New File Button */}
      <button
        onClick={onNewFile}
        className="m-3 flex items-center gap-2 w-full px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
      >
        <Plus className="w-4 h-4" />
        New File
      </button>

      {/* Files List */}
      <div className="flex-1 overflow-y-auto">
        {project?.files.map((file) => (
          <button
            key={file.id}
            onClick={() => onFileSelect(file)}
            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 border-l-2 ${
              currentFile?.id === file.id
                ? 'bg-slate-800 border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-300'
            } transition`}
          >
            <FileText className="w-4 h-4" />
            <span className="truncate">{file.name}</span>
          </button>
        ))}
      </div>

      {/* Settings */}
      <div className="border-t border-slate-800 p-3">
        <button className="w-full flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white rounded hover:bg-slate-800 text-sm transition">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </div>
  )
}

export default Sidebar
