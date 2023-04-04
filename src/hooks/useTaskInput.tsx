import { ChangeEvent, useState, KeyboardEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Task } from '@/domain/models/Task'
import { User } from '@/domain/models/User'

interface UseTaskInputReturnType {
  inputValue: string
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleAddTask: (e: KeyboardEvent<HTMLInputElement>) => void
}

const useTaskInput = (
  user: User | undefined,
  tasks: Task[],
  setTasks: (tasks: Task[]) => void
): UseTaskInputReturnType => {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const newTask = {
        id: uuidv4(),
        title: inputValue.trim(),
        completed: false,
      }
      const updatedTasks = [newTask, ...tasks]
      if (user) {
        user.tasks = updatedTasks
        setTasks(updatedTasks)
        setInputValue('')
      }
    }
  }

  return { inputValue, handleInputChange, handleAddTask }
}

export default useTaskInput
