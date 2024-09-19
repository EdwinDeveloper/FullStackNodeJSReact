import React, { useState } from 'react';
import './TaskList.css';
import { Task, User } from '../../models/models';
import { deleteTask } from '../../config/services';
import { FetchCall } from '../../config/fetch';
import { DeleteTaskResponse } from '../../models/models';
import CreateTask from '../CreateTask/CreateTask';

interface TaskListProps {
  user: User;
  backList: ()=> void;
}

const TaskList: React.FC<TaskListProps> = ({ user, backList }) => {
  const { tasks } = user
  const [newTaskForm, setNewTaskForm] = useState(false);

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

  const da = (task: Task) => {

  }

  return (
    <div className="task-list">
      <h2 className="task-list-title">{user.name}'s Tasks</h2>
      { !newTaskForm ? <button className="edit-btn" onClick={() => handleNewTask()}>New task</button> : null }
      { 
        newTaskForm
        ?
          <CreateTask user={user} onCreateTask={da}/>
        :
        tasks.length === 0 ? (
          <p className="no-tasks">No tasks available</p>
            ) 
          : 
            (
              <ul className="task-list-items">
                {tasks.map(task => (
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
                      <button className="edit-btn" onClick={() => {}}>Edit</button>
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
