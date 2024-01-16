import React, { useEffect, useState }  from'react'
import BasicCard from '../../common/BasicCard/BasicCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchBar from '../../common/SearchBar/SearchBar.js';
import IconButton from '@mui/material/IconButton';
import CommonButton from '../../common/CommonButton/CommonButton';
import  Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GridWrapper from '../../common/GridWrapper/GridWrapper.js';
//import  Grid  from '@mui/material/Grid';
import cardHeaderStyles from './styles.js'
//import BasicModal from '../../common/BasicModal/BasicModal.js';
//import NewUserModal from '../../components/Modal/NewUserModal.js';
//import BasicModal from '../../common/BasicModal/BasicModal.js';
import NewUserModal from '../../components/Modal/NewUserModal.js';
import axios from 'axios';



const Authentication = () => {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [searchResults, setSearchResults] = useState(users);
    

    useEffect(() => {
       console.log('use effect called');
       getUsersData();
      },[]);


      const getUsersData = async  ()=>{
        

        try {
            const request = await axios.get("http://192.168.184.30:3000/api/all-users");
            if (request.status === 200) {
                console.log(request.data);
                setUsers(request.data);
            }
            
        } catch (error) {
            
        }


      }
     

    const getHeader = () => {
        const handleSearch = (value) => {
            filterData(value);
        };

        const filterData = (value) => {
            const lowercasedValue = value.toLowerCase().trim();
            if (lowercasedValue === '') setUsers(searchResults);
            else {
                const filteredData = searchResults.filter((item) => {
                    return Object.keys(item).some((key) => 
                    item[key].toString().toLowerCase().includes(lowercasedValue)
                    );
                });
                setUsers(filteredData)
            };
        };

        const addUser = () => {
            setOpen(true);
        };

        return (
            <Box sx={cardHeaderStyles.wrapper}>
                <SearchBar 
                    placeholder="Search by email address, phone number, or user UID"
                    onChange={(event) => handleSearch(event.target.value)}
                    searchBarWidth='720px'
                />
                <Box>
                    <CommonButton 
                        variant="contained"
                        onClick={addUser}
                        size="large"
                        sx={cardHeaderStyles.addUserButton}
                    >
                        Add user
                    </CommonButton>
                    <IconButton>
                        <RefreshIcon />
                    </IconButton>
                </Box>
            </Box>
        )
    };

    const addNewUser = (data) => {
        users.push({ ...data });
        setOpen(false);
    };

    const getContent = () => (
        <>
            {
                
                users.length ? 
                    users.map((user) => (
                        <Box sx={{ marginBottom: '20px' }}>
                            <Typography>User ID: {user.id}</Typography>
                            <Typography>Email: {user.email}</Typography>
                            <Typography>Phone Number: {user.phone}</Typography>
                        </Box>
                    )) :
                    <Typography 
                        align="center"
                        sx={{ margin: '40px 16px', color: 'rgba(0, 0, 0, 0.6)', fontSize: '1.3rem'}}
                    >
                        No users for this project yet
                    </Typography>
            }
        </>
    );

    return (
        <GridWrapper>
            <BasicCard
                header={getHeader()}
                content={getContent()}
            />
            <NewUserModal open={open} onClose={() => setOpen(false)} addNewUser={addNewUser}/>
        </GridWrapper>
    )
}

export default Authentication;