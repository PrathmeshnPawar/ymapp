import React, { useState, useEffect } from 'react';
import GridWrapper from '../../common/GridWrapper/GridWrapper'
import BasicSnackbar from '../../common/BasicSnackbar/BasicSnackbar';
import UserTable from '../../components/UserTable/UserTable';
import BasicCard from '../../common/BasicCard/BasicCard';

const Database = () => {
  const [open, setOpen] = useState(false);



  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      setOpen(false);
    }
  };


  return (
    <GridWrapper>
      <BasicCard content={<UserTable onError={() => setOpen(true)}  />} />
      <BasicSnackbar
        open={open}
        severity="error"
        message="Data couldn't be fetched"
        onClose={handleClose}
      />
    </GridWrapper>
  );
};

export default Database;

