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
        fetch('http://192.168.215.30:3000/api/all-users')
            .then((response) => response.json())
            .then((json) => setUsers(json));
                // Set loading to false once data is loaded
            
    }, [onError]);

    return (
        <DataTable
            rows={users}
            columns={columns}
           // Consider both loading state and empty users array
            sx={userTableStyles}
        />
    );
};

export default UserTable;
