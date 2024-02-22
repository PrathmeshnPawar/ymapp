import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';


const DataTable = ({ rows, columns, loading, onDelete,onClick, sx }) => {
  const [pageSize, setPageSize] = useState(2);



  // Add a new column for the delete button
 

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      sx={sx}
      pagination
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[2, 5, 10]}
    />
  );
};

export default DataTable;
