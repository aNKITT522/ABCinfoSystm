// import React from 'react'
import React, { useState } from 'react';
import styles from '../style/UserTable.module.css';

const initialFormData = {
  username: '',
  role: 'Administrator',
  position: 'Auditor',
  password: ''
};

 const UserTable = () => {

    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: name === 'roles' ? [...formData.roles, value] : value
      });
    };
  
    const handleCreateUser = () => {
      if (editMode) {
        const updatedUsers = [...users];
        updatedUsers[editIndex] = formData;
        setUsers(updatedUsers);
        setEditMode(false);
      } else {
        setUsers([...users, formData]);
      }
      setFormData(initialFormData);
    };
  
    const handleEditUser = (index) => {
      setFormData(users[index]);
      setEditMode(true);
      setEditIndex(index);
    };
  
    const handleDeleteUser = (index) => {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
    };
  
//   const [users, setUsers] = useState([]);
//   const [formData, setFormData] = useState(initialFormData);
//   const [editMode, setEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleCreateUser = () => {
//     if (editMode) {
//       const updatedUsers = [...users];
//       updatedUsers[editIndex] = formData;
//       setUsers(updatedUsers);
//       setEditMode(false);
//     } else {
//       setUsers([...users, formData]);
//     }
//     setFormData(initialFormData);
//   };

//   const handleEditUser = (index) => {
//     setFormData(users[index]);
//     setEditMode(true);
//     setEditIndex(index);
//   };

//   const handleDeleteUser = (index) => {
//     const updatedUsers = users.filter((_, i) => i !== index);
//     setUsers(updatedUsers);
//   };
// export default function User() {
  return (
    <div className={styles.userTableContainer}>
      <h2>User Management</h2>
      <form className={styles.form}  onSubmit={(e) => e.preventDefault()}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Administrator">Administrator</option>
            <option value="Support">Support</option>
            <option value="Assistant">Assistant</option>
          </select>
        </label>
        <label>
          Position:
          <select name="position" value={formData.position} onChange={handleChange}>
            <option value="Auditor">Auditor</option>
            <option value="Developer">Developer</option>
            <option value="Manager">Manager</option>
          </select>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <button onClick={handleCreateUser}>
          {editMode ? 'Update User' : 'Create User'}
        </button>
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.position}</td>
              <td>
                <button onClick={() => handleEditUser(index)}>Edit</button>
                <button onClick={() => handleDeleteUser(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;