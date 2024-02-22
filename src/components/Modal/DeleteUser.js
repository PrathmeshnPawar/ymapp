import React, { useState, useEffect } from 'react'
import BasicModal from '../../common/BasicModal/BasicModal'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import axios from 'axios';
//import { idID } from '@mui/material/locale';

const defaultInputValues = {
    id: '',
};



const DeleteUserModal = ({ open, onClose,deleteExistingUser,id,email,phone }) => {
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

    

    const validationSchema = Yup.object().shape({
        id: Yup.string()
            .required('User ID is required')
            .min(2, 'User ID must be at least 2 characters')
       
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema)
    });


const deleteUser = async (data) => {
    if (typeof deleteExistingUser === 'function') {
        deleteExistingUser(data);
        onClose();
    } else {
        console.error('deleteExistingUser is not a function');
    }
    try {
        const response = await axios.delete(`http://192.168.137.229:3000/api/delete-user/${data.id}`);
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
                placeholder="User ID"
                name="id"
                label="User ID"
                required
                {...register('id')}
                error={errors.id ? true : false}
                helperText={errors.id?.message}
                value={values.id}
                onChange={(event) => handleChange({ ...values, id: event.target.value })}
            />
        </Box>
    );
    
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Delete user"
            subTitle="Fill out inputs and hit 'submit' button."
            content={getContent()}
            onSubmit={handleSubmit(deleteUser)}
        />
            
    )
}

export default DeleteUserModal