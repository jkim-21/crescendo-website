import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { usePreviousUrlKeyword } from '../../../context/PrevUrlKeyword';

const SearchTable = ({ data }) => {
  const navigate = useNavigate();
  const {setPreviousUrlKeyword} = usePreviousUrlKeyword();


  const handleSchoolClick = (indexNumber) => {
    setPreviousUrlKeyword('school');
    navigate(`/tools/email-finder-system/school/${encodeURIComponent(indexNumber)}`);
  }

  // Repeat of School Detail Search Table Page
  const toTitleCase = (str) => {
    if (typeof str !== 'string' || str.includes('https://') || str.includes('http://')) {
      return str
    }
    const lowerCasedStr = str.toLowerCase();
    const lowerCasedWords = lowerCasedStr.split(' ');

    const titleCasedWords = lowerCasedWords.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const titleCasedStr = titleCasedWords.join(' ');
    return titleCasedStr;
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
      Cell: ({ cell }) => (
        <div>
          {toTitleCase(cell.getValue())}
        </div>
      )
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
    },
    muiTableBodyRowProps: {
      sx: {
        border:0
      }
    },
    muiTableBodyCellProps: {
      sx: {
        border:0
      }
    },
    muiTableHeadCellProps: {
      sx: {
        border:0
      }
    },
  });

  return (
    <div className='overflow-y-auto overflow-x-auto shadow-md rounded-[0.75rem]'>
      <MaterialReactTable
        table={table}/>
    </div>
  )
};

export default SearchTable;