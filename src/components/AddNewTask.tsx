import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Task, TaskFormInput } from '@/lib/type'
import { Dispatch, FormEvent, SetStateAction } from 'react'

interface AddNewTaskProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  handleAddSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleAddTask: () => void
  setNewTask: Dispatch<SetStateAction<TaskFormInput>>
  newTask: TaskFormInput
}

const AddNewTask = ({
  open,
  onOpenChange,
  handleAddSubmit,
  handleAddTask,
  setNewTask,
  newTask
}: AddNewTaskProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          className='cursor-pointer'
          onClick={handleAddTask}>
          Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleAddSubmit}>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>Fill in the task details.</DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='add-title'>Title</Label>
              <Input
                id='add-title'
                placeholder='Enter task title'
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                required
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='add-description'>Description</Label>
              <Input
                id='add-description'
                placeholder='Enter task description'
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                required
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='add-dueDate'>Due Date</Label>
              <Input
                id='add-dueDate'
                type='date'
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='add-status'>Status</Label>
              <Select
                value={newTask.status}
                onValueChange={(value) =>
                  setNewTask({ ...newTask, status: value as Task['status'] })
                }>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='pending'>Pending</SelectItem>
                    <SelectItem value='in-progress'>In Progress</SelectItem>
                    <SelectItem value='completed'>Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewTask
