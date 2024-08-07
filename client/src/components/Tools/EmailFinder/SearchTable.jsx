import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const SearchTable = ({data, setSchoolName, setSchoolUrl}) => {
  let value = ''
  const navigate = useNavigate();

  const handleSchoolClick = () => {
    navigate(`/tools/email-finder-system/school/${encodeURIComponent(value)}`);
    setSchoolName(value);
    setSchoolUrl(encodeURIComponent(value));
  }

  const columns = useMemo(() => {
    if (!data[0]) return [];
    const keys = Object.keys(data[0]);
    if (keys.length < 4) {s
      return [];
    }
  
    return (
      [
        {
          accessorKey: keys[0],
          header: 'School Name',
          size: 150,
          Cell: ({ cell }) => {
            value = cell.getValue();
            return (
              <button
                onClick={handleSchoolClick}
                className="sea-blue-text text-left hover:font-underline"
              >
                {cell.getValue()}
              </button>
            );
          },
        },
        {
          accessorKey: keys[1],
          header: 'State',
          size: 150,
        },
        {
          accessorKey: keys[2],
          header: 'City',
          size: 150,
        },
        {
          accessorKey: keys[3],
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
