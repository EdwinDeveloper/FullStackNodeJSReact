import React from 'react';
import UserCard from '../UserCard/UserCard';
import './UserList.css';
import { User, DeleteUserResponse, UpdateUserResponse } from '../../models/models';
import { deleteUser, updateUser} from '../../config/services';
import { FetchCall } from '../../config/fetch';

interface UserCardProps {
  users: User[]
}

const UserList: React.FC<UserCardProps> = ({ users }) => {

  const handleUpdate = async(updatedDataUser: User) => {
    const confirmed = window.confirm('Are you sure you want to update this user ?');
    if (confirmed) {
      const response: UpdateUserResponse = await FetchCall(updateUser(updatedDataUser))
      response.status === 201 ? window.location.reload() : window.alert('User not updated')
    }
  };

  const handleDelete = async(userId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this user ?');
    if (confirmed) {
      const response: DeleteUserResponse = await FetchCall(deleteUser(userId))
      response.status === 204 ? window.location.reload() : window.alert('User not eliminated')
    }
  };
  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <div className="users-grid">
        {users.map((user: User) => (
          <UserCard key={user.id} user={user} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
