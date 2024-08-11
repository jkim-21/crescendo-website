import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const SearchTable = ({ data }) => {
  const navigate = useNavigate();

  const handleSchoolClick = (indexNumber) => {
    navigate(`/tools/email-finder-system/school/${encodeURIComponent(indexNumber)}`);
  }

  const columns = useMemo(() => [
    {
      accessorKey: 'SCH_NAME',
      header: 'School Name',
      size: 150,
      Cell: ({ row }) => (
        <button
          onClick={() => handleSchoolClick(row.original.INDEX_NUMBER)}
          className="sea-blue-text text-left hover:font-underline"
        >
          {row.original.SCH_NAME}
        </button>
      ),
    },
    {
      accessorKey: 'STATENAME',
      header: 'State',
      size: 150,
    },
    {
      accessorKey: 'LCITY',
      header: 'City',
      size: 150,
    },
    {
      accessorKey: 'LSTREET1',
      header: 'Street',
      size: 150,
    },
  ], [navigate]);

  const table = useMaterialReactTable({
    columns,
    data,
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

      }
    },
    muiTableHeadCellProps: {
      sx: {

      }
    },
  });

  return (
    <div className="school-table overflow-y-auto overflow-x-auto shadow-md rounded-[0.5rem]">
      <MaterialReactTable
        table={table}
        sx={{ boxShadow: 1 }} />
    </div>
  )
};

export default SearchTable;