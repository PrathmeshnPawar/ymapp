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
    email: '',
    phone: ''
};



const NewUserModal = ({ open, onClose, addNewUser,id,email,phone }) => {
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

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = Yup.object().shape({
        id: Yup.string()
            .required('User ID is required')
            .min(0, 'User ID must be at least 6 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid.'),
        phone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

 const addUser = async (data) => {
    // Check if addNewUser is a function before calling it
    if (typeof addNewUser === 'function') {
        addNewUser(data);
        onClose();
    } else {
        console.error('addNewUser is not a function');
    }
    try {
            const response = await axios.post('http://192.168.215.30:3000/api/create-user', {
            id: data.id,
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
                placeholder="User ID"
                name="id"
                label="User ID"
                required
                {...register('id')}
                error={errors.userId ? true : false}
                helperText={errors.userId?.message}
                value={values.userId}
                onChange={(event) => handleChange({ ...values, userId: event.target.value })}
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
                error={errors.phoneNumber ? true : false}
                helperText={errors.phoneNumber?.message}
                value={values.phoneNumber}
                onChange={(event) => handleChange({ ...values, phoneNumber: event.target.value })}
            />
        </Box>
    );
    
    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="New user"
            subTitle="Fill out inputs and hit 'submit' button."
            content={getContent()}
            onSubmit={handleSubmit(addUser)}
        />
            
    )
}

export default NewUserModal