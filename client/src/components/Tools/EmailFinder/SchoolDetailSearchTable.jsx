import React, {useEffect} from 'react';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const SchoolDetailSearchTable = ({data}) => {
  let value = '';

  const columns = useMemo(() => {
    if (!data[0]) return [];
    const keys = Object.keys(data[0]);
    if (keys.length < 1) {
      return [];
    }

    return (
      [
        {
            accessorKey: keys[0],
            header: 'Email',
            size: 150,
        },
        {
            accessorKey: keys[1],
            header: 'Email Origin Link',
            size: 150,
            Cell: ({ cell }) => {
                value = cell.getValue();
                return (
                    <button className="sea-blue-text text-left hover:font-underline">
                        <a href={cell.getValue()}>
                            {cell.getValue()}
                        </a>
                    </button>
                );
            },
        },
      ])
    },
    [data],
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

export default SchoolDetailSearchTable;