import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Skeleton } from './ui/skeleton'
import AddNewTask from './AddNewTask'
import EditTask from './EditTask'
import { TaskFormInput } from '@/lib/type'

interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  dueDate: string
  subtasks: string[]
}

const Task = () => {
  const [editTaskOpen, setEditTaskOpen] = useState(false)
  const [addTaskOpen, setAddTaskOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [loadingTaskIds, setLoadingTaskIds] = useState<Set<string>>(new Set())
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Finish project report',
      description: 'Complete the final draft and send to manager',
      status: 'in-progress',
      dueDate: '2025-07-03',
      subtasks: []
    }
  ])

  // Form states
  const [newTask, setNewTask] = useState<TaskFormInput>({
    title: '',
    description: '',
    status: 'pending',
    dueDate: new Date().toISOString().split('T')[0]
  })

  const statusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800'
      case 'in-progress':
        return 'bg-blue-200 text-blue-800'
      case 'completed':
        return 'bg-green-200 text-green-800'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setEditTaskOpen(true)
  }

  const handleAddTask = () => {
    setNewTask({
      title: '',
      description: '',
      status: 'pending',
      dueDate: new Date().toISOString().split('T')[0]
    })
    setAddTaskOpen(true)
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newTask.title.trim()) {
      toast.error('Task title is required')
      return
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      dueDate: newTask.dueDate,
      subtasks: []
    }

    setTasks([...tasks, task])
    setAddTaskOpen(false)
    toast.success('Task added successfully')
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedTask?.title.trim()) {
      toast.error('Task title is required')
      return
    }

    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? selectedTask : task
    )

    setTasks(updatedTasks)
    setEditTaskOpen(false)
    toast.success('Task updated successfully')
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    toast.success('Task deleted successfully')
  }

  const handleSuggestSubtasks = async (task: Task) => {
    setLoadingTaskIds((prev) => new Set(prev).add(task.id))
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskTitle: task.title,
          taskDescription: task.description
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions')
      }

      const { subtasks } = await response.json()

      setTasks((tasks) =>
        tasks.map((t) => (t.id === task.id ? { ...t, subtasks } : t))
      )

      toast.success('Subtasks generated successfully')
    } catch (error) {
      toast.error('Failed to generate subtasks')
      console.error(error)
    } finally {
      setLoadingTaskIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(task.id)
        return newSet
      })
    }
  }

  return (
    <div className='md:w-2xl mx-auto p-6 bg-gray-50 min-h-screen relative'>
      <div className='text-center mb-6'>
        <AddNewTask
          open={addTaskOpen}
          onOpenChange={setAddTaskOpen}
          handleAddSubmit={handleAddSubmit}
          handleAddTask={handleAddTask}
          setNewTask={setNewTask}
          newTask={newTask}
        />
      </div>
      <h2 className='md:text-3xl sm:text-2xl font-bold mb-6 text-center text-gray-900'>
        Task List
      </h2>

      {tasks.length === 0 ? (
        <div className='text-center py-10'>
          <p className='text-gray-500'>
            No tasks found. Add a new task to get started.
          </p>
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className='mb-6 shadow p-4 bg-white rounded'>
            <div className='flex justify-between items-center'>
              <h3 className='md:text-xl font-semibold mb-2 text-gray-800'>
                {task.title}
              </h3>
              <EditTask
                task={task}
                open={editTaskOpen}
                onOpenChange={setEditTaskOpen}
                handleEditTask={handleEditTask}
                handleEditSubmit={handleEditSubmit}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
              />
            </div>
            <p className='text-gray-600 mb-3'>{task.description}</p>

            <div className='flex items-center justify-between mb-4'>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                  task.status
                )}`}>
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
              <span className='text-gray-500 text-sm'>
                {new Date(task.dueDate) < new Date() ? 'Due' : 'Deadline'}:{' '}
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>

            <div>
              <button
                className='cursor-pointer px-4 py-2 text-sm bg-amber-400 text-amber-900 rounded-md font-semibold hover:bg-amber-500 transition'
                type='button'
                onClick={() => handleSuggestSubtasks(task)}>
                Suggest Subtasks
              </button>

              {loadingTaskIds.has(task.id) ? (
                <Skeleton className='h-4 w-full mt-3' />
              ) : (
                task.subtasks.length > 0 && (
                  <div className='flex flex-wrap gap-2 mt-3'>
                    {task.subtasks.map((subtask, subIndex) => (
                      <button
                        key={subIndex}
                        className='px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 text-sm transition'
                        type='button'>
                        {subtask}
                      </button>
                    ))}
                  </div>
                )
              )}
            </div>
            <Button
              className='w-full bg-red-400 mt-4 p-1 text-sm text-white rounded hover:bg-red-500 transition cursor-pointer'
              onClick={() => handleDeleteTask(task.id)}>
              Delete
            </Button>
          </div>
        ))
      )}
    </div>
  )
}

export default Task
