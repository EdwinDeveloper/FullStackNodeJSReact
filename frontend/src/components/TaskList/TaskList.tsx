import React, { useState } from 'react';
import './TaskList.css';
import { Task, User } from '../../models/models';
import { deleteTask } from '../../config/services';
import { FetchCall } from '../../config/fetch';
import { DeleteTaskResponse } from '../../models/models';
import CreateTask from '../CreateTask/CreateTask';
import { initialTask } from '../../models/initializator';
import { initialUser } from '../../models/initializator';

interface TaskListProps {
  user: User;
  backList: ()=> void;
}

const TaskList: React.FC<TaskListProps> = ({ user, backList }) => {

  const [userSelected, setUserSelected] = useState<User>(user)
  const [newTaskForm, setNewTaskForm] = useState(false);
  const [updateTaskForm, setUpdateTaskForm] = useState(false)
  const [taskToUpdate, setTaskToUpdate] = useState(initialTask)

  const { tasks } = user

  const hadleDeleteTask = async(taskId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this task ?');
    if(confirmed){
      const response: DeleteTaskResponse = await FetchCall(deleteTask(taskId))
      response.status === 204 ? window.location.reload() : window.alert('Task not eliminated')
    }
  }

  const handleNewTask = ()=>{
    setNewTaskForm(true)
  }

  const handleUpdateTask = (task: Task) => {
    setUpdateTaskForm(true)
    setTaskToUpdate(task)
  }

  const handleInfoUserUpdated = (userChanged: User) => {
    setUserSelected(userChanged)
    setUpdateTaskForm(false)
    setNewTaskForm(false)
  }

  return (
    <div className="task-list">
      <h2 className="task-list-title">{userSelected.name} Tasks</h2>
      { !newTaskForm ? <button className="edit-btn" onClick={() => handleNewTask()}>New task</button> : null }
      { 
        newTaskForm || updateTaskForm
        ?
          <CreateTask taskToUpdate={taskToUpdate} user={userSelected} onCreateTask={handleUpdateTask} updateTask={updateTaskForm} handleInfoUserUpdated={handleInfoUserUpdated}/>
        :
        userSelected.tasks.length === 0 ? (
          <p className="no-tasks">No tasks available</p>
            ) 
          : 
            (
              <ul className="task-list-items">
                {userSelected.tasks.map(task => (
                  <li key={task.id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
                    <div className="task-info">
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => {}}
                        className="task-checkbox"
                      />
                      <h4 className="task-title">{task.title}</h4>
                    </div>
                    <div className="task-actions">
                      <button className="edit-btn" onClick={() => handleUpdateTask(task)}>Edit</button>
                      <button className="delete-btn" onClick={() => hadleDeleteTask(task.id)}>Delete</button>
                      <p className="task-priority">Priority: {task.priority}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )
      }
      <button className="edit-btn" onClick={() => backList()}>Go back</button>
</div>

  );
};

export default TaskList;
