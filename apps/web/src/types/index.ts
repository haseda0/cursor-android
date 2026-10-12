export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
}

export interface Project {
  id: string
  name: string
  description?: string
  language: 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'go' | 'rust'
  files: ProjectFile[]
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface ProjectFile {
  id: string
  projectId: string
  name: string
  path: string
  content: string
  language: string
  createdAt: Date
  updatedAt: Date
}

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  codeContext?: string
  createdAt: Date
}

export interface CodeCompletion {
  text: string
  range: {
    startLineNumber: number
    startColumn: number
    endLineNumber: number
    endColumn: number
  }
}

export interface EditorState {
  currentProject: Project | null
  currentFile: ProjectFile | null
  files: ProjectFile[]
  unsavedChanges: boolean
}

export interface ChatSession {
  id: string
  projectId: string
  messages: AIMessage[]
  context: string
  createdAt: Date
  updatedAt: Date
}
