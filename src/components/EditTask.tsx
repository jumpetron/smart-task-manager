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
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Task } from '@/lib/type'
import { FormEvent } from 'react'

interface EditTaskProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  handleEditTask: (task: Task) => void
  handleEditSubmit: (e: FormEvent<HTMLFormElement>) => void
  task: Task
  selectedTask: Task | null
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>
}

const EditTask = ({
  open,
  onOpenChange,
  handleEditTask,
  handleEditSubmit,
  task,
  selectedTask,
  setSelectedTask
}: EditTaskProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <span
          className='underline cursor-pointer'
          onClick={() => handleEditTask(task)}>
          Edit
        </span>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleEditSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Make changes and save.</DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                value={selectedTask?.title || ''}
                onChange={(e) =>
                  selectedTask &&
                  setSelectedTask({
                    ...selectedTask,
                    title: e.target.value
                  })
                }
                required
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='description'>Description</Label>
              <Input
                id='description'
                value={selectedTask?.description || ''}
                onChange={(e) =>
                  selectedTask &&
                  setSelectedTask({
                    ...selectedTask,
                    description: e.target.value
                  })
                }
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='dueDate'>Due Date</Label>
              <Input
                id='dueDate'
                type='date'
                value={selectedTask?.dueDate || ''}
                onChange={(e) =>
                  selectedTask &&
                  setSelectedTask({
                    ...selectedTask,
                    dueDate: e.target.value
                  })
                }
              />
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='status'>Status</Label>
              <Select
                value={selectedTask?.status || ''}
                onValueChange={(value) =>
                  selectedTask &&
                  setSelectedTask({
                    ...selectedTask,
                    status: value as Task['status']
                  })
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
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTask
