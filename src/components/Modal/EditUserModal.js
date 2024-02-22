import React, { useState, useEffect } from 'react'
import BasicModal from '../../common/BasicModal/BasicModal'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import axios from 'axios';
//import { userNuserN } from '@mui/material/locale';

const defaultInputValues = {
    userN: '',
    email: '',
    phone: ''
};



const EditUserModal = ({ open, onClose,editExistingUser,userN,email,phone }) => {
    const [values, setValues] = useState(defaultInputValues);


    const modalStyles = {
        inputFields: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            marginBottom: '15px',
            '.MuiFormControl-root': {
                marginBottom: '20px',
            },
        },
    };

    const phoneRegExp = /^[0-9]{10}$/;

    const valuserNationSchema = Yup.object().shape({
        userN: Yup.string()
            .required('User userN is required')
            .min(2, 'User userN must be at least 2 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invaluserN.'),
        phone: Yup.string()
            .matches(phoneRegExp, 'Phone number must be exactly 10 digits')
            .required('Phone number is required'),
       
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(valuserNationSchema)
    });


const editUser = async (data) => {
    if (typeof editExistingUser === 'function') {
        editExistingUser(data);
        onClose();
    } else {
        console.error('editNewUser is not a function');
    }
    try {
            const response = await axios.put('http://192.168.0.103:3000/api/update-user', {
            username: data.userN,
            email: data.email,
            phone: data.phone,
        });
        console.log('Server response:', response.data);

        // You can update your state or perform other actions based on the response if necessary
    } catch (error) {
        console.log("Error",error)
    }    
};

    const handleChange =  (value) => {
        setValues(value)
    };
    useEffect(() => {
        if (open) setValues(defaultInputValues);
    }, [open])

    const getContent = () => (
        <Box sx={modalStyles.inputFields}>
            <TextField
                placeholder="User Name"
                name="userN"
                label="User Name"
                required
                {...register('userN')}
                error={errors.userN ? true : false}
                helperText={errors.userN?.message}
                value={values.userN}
                onChange={(event) => handleChange({ ...values, userN: event.target.value })}
            />
            <TextField
                placeholder="Email"
                name="email"
                label="Email"
                required
                {...register('email')}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                value={values.email}
                onChange={(event) => handleChange({ ...values, email: event.target.value })}
            />
            <TextField
                placeholder="Phone number"
                name="phone"
                label="Phone number"
                required
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                value={values.phone}
                onChange={(event) => handleChange({ ...values, phone: event.target.value })}
            />
        </Box>
    );
    
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Edit user"
            subTitle="Fill out inputs and hit 'submit' button."
            content={getContent()}
            onSubmit={handleSubmit(editUser)}
        />
            
    )
}

export default EditUserModal

// import React, { useState, useEffect } from 'react';
// import DataTable from '../../common/DataTable/DataTable';
// import { IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditUserModal from '../Modal/EditUserModal';

// const columns = [
//     { field: 'userN', headerName: 'User userN', wuserNth: 150 },
//     { field: 'email', headerName: 'E-mail', wuserNth: 200 },
//     { field: 'phone', headerName: 'Phone Number', wuserNth: 200 },
//     {
//         field: 'Actions',
//         headerName: 'Actions',
//         wuserNth: 200,
//         renderCell: (params) => (
//             <>
//                 <IconButton
//                     color="secondary"
//                     onClick={() => handleDeleteUser(params.row.userN)}
//                 >
//                     <DeleteIcon />
//                 </IconButton>
//                 <IconButton
//                     color="primary"
//                     onClick={() => handleEditUser(params.row)}
//                 >
//                     {/* Add your EditIcon component or any other edit-related component */}
//                     Edit
//                 </IconButton>
//             </>
//         ),
//     },
// ];

// const UserTable = ({ onError }) => {
//     const userTableStyles = {
//         height: '650px',
//     };

//     const [users, setUsers] = useState([]);
//     const [editingUser, setEditingUser] = useState(null);

//     useEffect(() => {
//         fetch('http://192.168.123.30:3000/api/all-users')
//             .then((response) => response.json())
//             .then((json) => setUsers(json))
//             .catch((error) => {
//                 // Handle fetch errors
//                 onError('Error fetching user data');
//             });
//     }, [onError]);

//     const handleDeleteUser = (useruserN) => {
//         // Add logic to handle the deletion of a user with the given useruserN
//         // For example, you can send a delete request to the server
//         console.log(`Deleting user with userN: ${useruserN}`);
//     };

//     const handleEditUser = (user) => {
//         setEditingUser(user);
//     };

//     return (
//         <>
//             <DataTable
//                 rows={users}
//                 columns={columns}
//                 sx={userTableStyles}
//             />
//             {editingUser && (
//                 <EditUserModal
//                     open={open}
//                     onClose={() => setEditingUser(null)}
//                     editExistingUser={editExistingUser}
//                     userN={editingUser.userN}
//                     email={editingUser.email}
//                     phone={editingUser.phone}
//                 />
//             )}
//         </>
//     );
// };

// export default UserTable;
