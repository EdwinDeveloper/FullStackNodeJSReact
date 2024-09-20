import React, { useState } from 'react';
import './CreateTask.css'
import { User, Task, TaskRequest } from '../../models/models';
import { initialTask } from '../../models/initializator'
import { createTask as createTaskService, createOneUser } from '../../config/services';
import { FetchCall } from '../../config/fetch';
import { CreateTaskResponse, UpateTaskResponse, CreateUserResponse } from '../../models/models';

interface CreateTaskProps {
  onCreateTask: (task: Task) => void;
  handleInfoUserUpdated: (user: User) => void;
  user: User;
  updateTask: boolean;
  taskToUpdate:Task
}

const CreateTask: React.FC<CreateTaskProps> = ({ onCreateTask, user, updateTask, taskToUpdate, handleInfoUserUpdated }) => {
  const [taskData, setTaskData] = useState<Task>(updateTask ? taskToUpdate :initialTask);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setTaskData((prevTask) => ({
        ...prevTask,
        [name]: checked,
      }));
    } else {
      setTaskData((prevTask) => ({
        ...prevTask,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (taskData.title.trim() === '') {
      alert('Task title is required');
      return;
    }

    if(updateTask){
      let newData: TaskRequest = {
        id: taskData.id,
        title: taskData.title,
        priority: taskData.priority,
        isCompleted: updateTask ? taskData.isCompleted : false
      }

      const response: CreateTaskResponse = await FetchCall(createTaskService(newData))

      const updated: CreateUserResponse = await FetchCall(createOneUser(user.id))
      updated.status === 200 ? handleInfoUserUpdated(updated.data) : window.alert('Task not updated')
    }else{
      let newData: TaskRequest = {
        title: taskData.title,
        priority: taskData.priority,
        isCompleted: updateTask ? taskToUpdate.isCompleted : false,
        assignedToId: user.id
      }

      const response: UpateTaskResponse = await FetchCall(createTaskService(newData))

      const updated: CreateUserResponse = await FetchCall(createOneUser(user.id))
      updated.status === 200 ? handleInfoUserUpdated(updated.data) : window.alert('Task not created')
    }
  };

  return (
    <div className="create-task">
      {
        updateTask
        ?
        <h2>Update the task</h2>
        :
        <h2>Create New Task</h2>
      }
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="input-field"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="isCompleted">Completed</label>
          <input
            type="checkbox"
            id="isCompleted"
            name="isCompleted"
            className="check-field"
            checked={taskData.isCompleted}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="create-btn">
          {
            updateTask
            ?
            "Update Task"
            :
            "Create Task"
          }
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
