import { Task } from '@/domain/models/Task'

export interface User {
  id: string
  username: string
  password: string
  tasks: Task[]
}
