import React, { useState } from 'react';
import './UserCard.css';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onDelete: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>({ ...user });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUser({ ...user }); // Reset to original values if canceled
  };

  const handleSaveClick = () => {
    onUpdate(editedUser); // Pass the updated user object back to the parent
    setIsEditing(false); // Exit edit mode
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="user-card">
      {isEditing ? (
        <>
          <form onSubmit={handleSaveClick}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
                className="user-input"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                className="user-input"
                required
              />
            </div>
            <div className="user-card-buttons">
              <button type='submit' className="save-btn">Save</button>
              <button onClick={handleCancelClick} className="cancel-btn">Cancel</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h3 className="user-name">{user.name}</h3>
          <p className="user-email">{user.email}</p>
          <div className="user-card-buttons">
            <button type="submit" onClick={handleEditClick} className="update-btn">Update</button>
            <button onClick={() => onDelete(user.id)} className="delete-btn">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserCard;
