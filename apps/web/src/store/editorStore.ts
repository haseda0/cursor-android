import { create } from 'zustand'
import { Project, ProjectFile } from '@/types'

interface EditorStore {
  currentProject: Project | null
  currentFile: ProjectFile | null
  files: ProjectFile[]
  unsavedChanges: boolean
  sidebarOpen: boolean
  terminalOpen: boolean
  aiPanelOpen: boolean

  // Actions
  setCurrentProject: (project: Project | null) => void
  setCurrentFile: (file: ProjectFile | null) => void
  addFile: (file: ProjectFile) => void
  removeFile: (fileId: string) => void
  updateFile: (fileId: string, content: string) => void
  setUnsavedChanges: (value: boolean) => void
  toggleSidebar: () => void
  toggleTerminal: () => void
  toggleAIPanel: () => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  currentProject: null,
  currentFile: null,
  files: [],
  unsavedChanges: false,
  sidebarOpen: true,
  terminalOpen: false,
  aiPanelOpen: true,

  setCurrentProject: (project) => set({ currentProject: project }),
  setCurrentFile: (file) => set({ currentFile: file }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (fileId) =>
    set((state) => ({
      files: state.files.filter((f) => f.id !== fileId),
      currentFile: state.currentFile?.id === fileId ? null : state.currentFile,
    })),
  updateFile: (fileId, content) =>
    set((state) => ({
      files: state.files.map((f) => (f.id === fileId ? { ...f, content } : f)),
      currentFile:
        state.currentFile?.id === fileId
          ? { ...state.currentFile, content }
          : state.currentFile,
      unsavedChanges: true,
    })),
  setUnsavedChanges: (value) => set({ unsavedChanges: value }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleTerminal: () =>
    set((state) => ({ terminalOpen: !state.terminalOpen })),
  toggleAIPanel: () => set((state) => ({ aiPanelOpen: !state.aiPanelOpen })),
}))
