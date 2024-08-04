import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const SearchTable = ({data}) => {
  const navigate = useNavigate();

  const columns = useMemo(() => {
    if (!data[0]) return [];
    const keys = Object.keys(data[0]);
    if (keys.length < 3) {
      return [];
    }
    return ([
        {
          accessorKey: keys[0],
          header: 'School Name',
          size: 150,
          Cell: ({ cell }) => {
            const value = cell.getValue();
            return (
              <button
              onClick={() => navigate(`/tools/email-finder-system/display/${encodeURIComponent(value)}`)}
                        className="text-blue-500 hover:font-underline">
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
        shape: 'rounded',
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
    }});

  return (
    <div className="overflow-y-auto overflow-x-auto"> 
      <MaterialReactTable table={table} className='beige-bg' />

      {/* <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            {Object.keys(currentData[0]).map((key) => ( //data[0] is the headers of the table
              <th key={key} className="border border-gray-400 p-2 text-left bg-gray-100">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              {Object.entries(item).map(([key, value], idx) => ( //map each item by its index to a "td" table data cell in the table
                <td key={idx} className="border border-gray-400 p-2">
                  {key === 'SCH_NAME' ? (
                    <button
                      onClick={() => navigate(`/school/${encodeURIComponent(value)}`)}
                      className="text-blue-500 hover:underline"
                    >
                    {value}
                  </button>
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  )
};

export default SearchTable;
