import React from 'react'
import Button from '@mui/material/Button';

const CommonButton = ({children , color,disabled,size,sx,variant,onClick}) => {
  return (
    <Button
    onClick={onClick}
    color = {color}
    disabled = {disabled}
    size={size}
    sx={sx}
    variant={variant}
    >
        {children}
    </Button>
  )
}

export default CommonButton