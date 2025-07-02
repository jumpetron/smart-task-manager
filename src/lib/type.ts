export interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  dueDate: string
  subtasks: string[]
}

export type TaskFormInput = {
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  dueDate: string
}
