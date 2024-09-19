import { User, Task } from "./models";

export const initialUser: User = {
    id: '',
    name: '',
    email: '',
    tasks: []
};

export const initialTask: Task = {
  id: '',
  title: '',
  priority: 'Low',
  isCompleted: false,
  assignedToId: initialUser
}