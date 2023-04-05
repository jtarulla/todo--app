import DeleteIcon from '@mui/icons-material/Delete'

import { useTasksContext } from '../contexts/TasksContext'

const TaskList = () => {
  const { tasks, handleToggleTask, handleDeleteTask } = useTasksContext()

  return (
    <div className="task-list">
      {tasks.map(({ id, title, completed }) => (
        <div className="task-item" key={id}>
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => handleToggleTask(id)}
            />
            <span className="checkbox-indicator" />
          </label>
          <span className={`task-title ${completed ? 'task-completed' : ''}`}>
            {title}
          </span>
          <DeleteIcon
            fontSize="small"
            className="delete-button"
            onClick={() => handleDeleteTask(id)}
          />
        </div>
      ))}
    </div>
  )
}

export default TaskList
