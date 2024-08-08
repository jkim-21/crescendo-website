import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
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
                className="sea-blue-text text-left hover:font-underline"
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
    <div className="school-table overflow-y-auto overflow-x-auto shadow-md rounded-[0.5rem]"> 
      <MaterialReactTable 
        table={table}
        sx={{boxShadow: 1}}/>
    </div>
  )
};

export default SearchTable;
