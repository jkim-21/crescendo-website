import React, {useEffect} from 'react';
import { useMemo, useState } from 'react';
import {schoolTableTheme} from '../../../themes/theme'
import { ThemeProvider } from "@mui/material/styles";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const SchoolDetailSearchTable = ({jsonData, minHeight}) => {
  let value = '';
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataArray = Object.entries(jsonData).map(([email, link]) => ({
      Email: email,
      OriginLink: link,
    }));
    setData(dataArray);
  }, [jsonData]);


  const columns = useMemo(() => {
    if (!data[0]) return [];
    const keys = Object.keys(data[0]);
    if (keys.length < 2) {
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
            header: 'Origin Link',
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
        variant: 'outlined',
        rowsPerPageOptions: [5, 10, 20, 30],
      },
      muiTableContainerProps: {
        sx: {
          minHeight: minHeight,
        },
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
      },
      initialState: { pagination: {pageSize: 5} },
  });

  return (
    
      <ThemeProvider theme={schoolTableTheme}>
        <MaterialReactTable 
          table={table}
          sx={{}}
          className='flex-grow'/>
      </ThemeProvider>
  )};

export default SchoolDetailSearchTable;