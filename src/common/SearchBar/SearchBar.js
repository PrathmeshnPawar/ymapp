import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/material';

const SearchBar = ({placeholder,onChange}) => {
    
  return (
    <div>
        <SearchIcon/>
        <Input 
        placeholder={placeholder}
        onChange={onChange}
        />
    </div>
  )
}

export default SearchBar