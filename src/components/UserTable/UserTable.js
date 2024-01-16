import React, { useEffect, useState } from 'react';
import DataTable from '../../common/DataTable/DataTable';


const columns = [
    { field: 'id', headerName: 'User ID', width: 150 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'phone', headerName: 'Phone Number', width: 200 },
];

const UserTable = ({ onError }) => {
    const userTableStyles = {
        height: '650px',
    };

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://192.168.184.30:3000/api/all-users')
            .then((response) => response.json())
            .then((json) => setUsers(json))
            .catch((error) => {
                // Handle fetch errors
                onError('Error fetching user data');
            });
    }, [onError]);

  

    return (
        <DataTable
            rows={users}
            columns={columns}
          //  onDelete={handleDeleteUser}  // Pass the handleDeleteUser function to the DataTable component
            sx={userTableStyles}
        />
    );
};

export default UserTable;
