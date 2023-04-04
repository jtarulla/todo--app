import { useTasksContext } from '../contexts/TasksContext'

const TaskList = () => {
  const { tasks, handleToggleTask } = useTasksContext()

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task-item" key={task.id}>
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
            />
            <span className="checkbox-indicator" />
          </label>
          <span
            className={`task-title ${task.completed ? 'task-completed' : ''}`}
          >
            {task.title}
          </span>
        </div>
      ))}
    </div>
  )
}

export default TaskList
