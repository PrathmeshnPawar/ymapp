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



const NewUserModal = ({ open, onClose, addNewUser,userN,email,phone }) => {
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

 const addUser = async (data) => {
    // Check if addNewUser is a function before calling it
    if (typeof addNewUser === 'function') { 
        addNewUser(data);
        onClose();
    } else {
        console.error('addNewUser is not a function');
    }
    try {
            const response = await axios.post('http://192.168.0.103:3000/api/signup', {
    
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
                        {/* <TextField
                    placeholder="User id"
                    name="id"
                    label="User id"
                    required
                    {...register('id')}
                    error={errors.id ? true : false}
                    helperText={errors.id?.message}
                    value={values.id}
                    onChange={(event) => handleChange({ ...values, id: event.target.value })} /> */}

            <TextField
                placeholder="User name"
                name="userN"
                label="User name"
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
            title="New user"
            subTitle="Fill out inputs and hit 'submit' button."
            content={getContent()}
            onSubmit={handleSubmit(addUser)}
        />
            
    )
}

export default NewUserModal