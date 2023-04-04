import { useContext } from 'react'

import useTaskInput from '@/hooks/useTaskInput'
import TasksContext from '@/application/contexts/TasksContext'

const TaskInput: React.FC = () => {
  const { user, tasks, setTasks } = useContext(TasksContext)
  const { inputValue, handleInputChange, handleAddTask } = useTaskInput(
    user,
    tasks,
    setTasks
  )

  return (
    <input
      type="text"
      className="input-field"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleAddTask}
      placeholder="Add a task and ENTER"
      autoFocus
    />
  )
}

export default TaskInput
