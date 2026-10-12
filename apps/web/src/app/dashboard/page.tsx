'use client'

import { useState, useEffect } from 'react'
import { useEditorStore } from '@/store/editorStore'
import Sidebar from '@/components/Sidebar'
import CodeEditor from '@/components/Editor'
import AIChatPanel from '@/components/AIChatPanel'
import { Project, ProjectFile } from '@/types'
import { useApi } from '@/hooks/useApi'
import { Menu, X } from 'lucide-react'

export default function Dashboard() {
  const { currentFile, setCurrentFile, setCurrentProject, sidebarOpen, aiPanelOpen, toggleSidebar, toggleAIPanel } =
    useEditorStore()
  const { api } = useApi()
  const [project, setProject] = useState<Project | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await api.get('/projects')
        if (response.data.length > 0) {
          const loadedProject = response.data[0]
          setProject(loadedProject)
          setCurrentProject(loadedProject)
          if (loadedProject.files.length > 0) {
            setCurrentFile(loadedProject.files[0])
          }
        }
      } catch (error) {
        console.error('Error loading project:', error)
      }
    }

    loadProject()
  }, [api, setCurrentProject, setCurrentFile])

  const handleNewFile = async () => {
    const fileName = prompt('Enter file name:')
    if (!fileName || !project) return

    try {
      const response = await api.post(`/projects/${project.id}/files`, {
        name: fileName,
        content: '',
      })

      const newFile = response.data
      setProject({
        ...project,
        files: [...project.files, newFile],
      })
      setCurrentFile(newFile)
    } catch (error) {
      console.error('Error creating file:', error)
    }
  }

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-40 p-2 bg-slate-800 rounded text-white md:hidden"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      )}

      {/* Sidebar */}
      {(sidebarOpen || !isMobile) && (
        <div className={`${isMobile ? 'absolute left-0 top-0 h-full z-30' : ''}`}>
          <Sidebar
            project={project}
            onNewFile={handleNewFile}
            onFileSelect={setCurrentFile}
          />
        </div>
      )}

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        <CodeEditor />
      </div>

      {/* AI Panel */}
      {project && (aiPanelOpen || !isMobile) && (
        <div className={`${isMobile ? 'hidden' : 'w-80'} border-l border-slate-800`}>
          <AIChatPanel projectId={project.id} />
        </div>
      )}

      {/* Mobile AI Panel Toggle */}
      {isMobile && (
        <button
          onClick={toggleAIPanel}
          className="absolute top-4 right-4 z-40 p-2 bg-slate-800 rounded text-white"
        >
          {aiPanelOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      )}
    </div>
  )
}
