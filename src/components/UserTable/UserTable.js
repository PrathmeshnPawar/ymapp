import React, { useEffect, useState } from 'react';
import DataTable from '../../common/DataTable/DataTable';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUserModal from '../Modal/EditUserModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteUserModal from '../Modal/DeleteUser';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const UserTable = ({ onError, onClose }) => {
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [userId, setUserId] = useState();
  const [users, setUsers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [editUserModalState, setEditUserModalState] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');




  useEffect(() => {
    fetch('http://192.168.0.103:3000/api/all-users')
      .then((response) => response.json())
      .then((json) => {
        console.log('API Response:', json);
        setUsers(json);
      })
      .catch((error) => {
        // Handle fetch errors
        onError('Error fetching user data');
      });
  }, [onError]);

  const editUser = async (userId) => {
    const stringNumber = userId.id;
    const id = Number(stringNumber);
    console.log(id);

    try {
      // Set the user ID to trigger the modal
      setUserId(id);

      // Fetch user data by ID
      const response = await axios.get(`http://192.168.0.103:3000/api/get-user/${id}`);
      const userData = response.data; // Assuming the response contains user data

      // Set the fetched user data in the modal
      setEditUserModalState(userData);

      // Open the modal for editing
      setEditUserModalOpen(true);
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };

  const deleteUser = async (userId) => {
    const stringNumber = userId.id;
    const id = Number(stringNumber);
    console.log(id);

    try {
      await axios.delete(`http://192.168.0.103:3000/api/delete-user/${id}`, {
        id: id
      });

      console.log('User deleted successfully');

      // Update the state after successful deletion
      const updatedUsers = users.filter(user => user.id !== userId.id);
      setUsers(updatedUsers);

      setShowAlert(true);
      setAlertMessage('User deleted successfully');
      typeof onClose === 'function' && onClose();

     

    } catch (error) {
      console.error('Error deleting user', error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    }
  };

  const editExistingUser = async (userData) => {
    try {
      // Make a PUT request to update user data
      const response = await axios.put(`http://192.168.0.103:3000/api/update-user/${userData.id}`, {
        id : userData.id,
        username: userData.userN,
        email: userData.email,
        phone: userData.phone
      });

      console.log('Server response:', response.data);

      // Close the modal or form
      setEditUserModalOpen(false);
    } catch (error) {
      console.error('Error editing user', error);
      if (error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    }
  };

  const deleteExistingUser = (userId) => {
    // Assuming users is an array of user objects
    const updatedUsers = users.filter((user) => user.id !== userId.id);

    setUsers(updatedUsers);
    setDeleteUserModalOpen(false); // Close the modal or form
  };

  const columns = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'userN', headerName: 'User Name', width: 150 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'phone', headerName: 'Phone Number', width: 200 },
    {
      field: 'Actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => editUser(params.row)}>
            <EditIcon />
          </IconButton>
          
          <IconButton color="primary" onClick={() => deleteUser(params.row)}>
            <DeleteIcon />
          </IconButton>
          
        </>
      ),
    },
  ];

  const userTableStyles = {
    height: '650px',
    
  };

  return (
    <>
      <DataTable rows={users} columns={columns} sx={userTableStyles} />
      <EditUserModal
        open={editUserModalOpen}
        onClose={() => setEditUserModalOpen(false)}
        editExistingUser={editExistingUser}
        userId={userId} // Pass the user ID to the modal
        setEditUserModalState={setEditUserModalState} // Pass the state update function to the modal
        
      />

      <DeleteUserModal
        open={deleteUserModalOpen}
        onClose={() => setDeleteUserModalOpen(false)} // Ensure this is a function
        userId={userId}
        deleteExistingUser={deleteExistingUser}
       
      />
     
     {showAlert && (
        <Alert
          variant="filled"
          severity="success"
          onClose={() => {
            setShowAlert(false);
            setAlertMessage('');
          }}
        >
          {alertMessage}
        </Alert>
      )}
      
    </>
  );
};

export default UserTable;


