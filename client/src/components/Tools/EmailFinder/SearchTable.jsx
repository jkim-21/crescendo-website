import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const SearchTable = ({data}) => {
  const navigate = useNavigate();

  const handleSchoolClick = (indexNumber) => {
    navigate(`/tools/email-finder-system/school/${encodeURIComponent(indexNumber)}`);
  }

  const columns = useMemo(() => {
    if (!data[0]) return [];
    const keys = Object.keys(data[0]);
    if (keys.length < 4) {
      return [];
    }
  
    return (
      [
        {
          accessorKey: keys[1],
          header: 'School Name',
          size: 150,
          
          Cell: ({ cell, row }) => {
            return (
              <button
                onClick={() => {
                  const indexNumber = row.original[keys[0]];
                  handleSchoolClick(indexNumber);
                }}
                className="sea-blue-text text-left hover:underline"
              >
                {cell.getValue()}
              </button>
            );
          },
        },
        {
          accessorKey: keys[2],
          header: 'State',
          size: 150,
        },
        {
          accessorKey: keys[3],
          header: 'City',
          size: 150,
        },
        {
          accessorKey: keys[4],
          header: 'Street',
          size: 150,
        },
      ])
    },
    [data, navigate],
  );

    const table = useMaterialReactTable({
      columns,
      data: data,
      muiPaginationProps: {
        rowsPerPageOptions: [10, 20, 50, 100],
        variant: 'outlined',
      },
      muiTableBodyRowProps: {
        sx: {
        }
      },
      muiTableBodyCellProps: {
        sx: {
        },
      },
      muiTableHeadCellProps: {
        sx: {
        },
    }
  });

  return (
    <MaterialReactTable 
      table={table}
      sx={{}}/>
  )
};

export default SearchTable;