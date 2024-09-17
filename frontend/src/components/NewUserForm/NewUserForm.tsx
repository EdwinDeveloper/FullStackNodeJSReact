import React, { useState } from 'react';
import './NewUserForm.css';
import { createUser } from '../../config/services';
import { FetchCall } from '../../config/fetch';
import { CreateUserResponse } from '../../models/models';

const NewUserForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const newUserToCreate = {name, email}
    const response: CreateUserResponse = await FetchCall(createUser(newUserToCreate))
    response.status === 201 ? window.location.reload() : window.alert('User not created')
    if (name && email) {
      setName('');
      setEmail('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-user-form">
      <h2>Create New User</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-btn">Add User</button>
    </form>
  );
};

export default NewUserForm;
