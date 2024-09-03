import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useAuth } from '../../../context/AuthContext';
import { usePreviousUrlKeyword } from '../../../context/PrevUrlKeyword';


const SearchTable = ({ savedSchools }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {setPreviousUrlKeyword} = usePreviousUrlKeyword();
  const [data, setData] = useState('');

  const handleSchoolClick = (indexNumber) => {
    setPreviousUrlKeyword('save');
    navigate(`/tools/email-finder-system/school/${encodeURIComponent(indexNumber)}`);
  }

  useEffect(() => {
    setData(savedSchools)
  }, [savedSchools])

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


const handleSave = async (schoolIndex) => {
  if (!user || !user.uid || !schoolIndex) return;

  try {
    const response = await fetch(`/api/save-school`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: user.uid,
        schoolIndex: schoolIndex
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      console.log(response)
      throw new Error(data.error || 'Failed to save school') 
    }
    if (data.success) {
      setData((prevSchools) =>
        prevSchools.map((school) =>
          school.INDEX_NUMBER === schoolIndex
            ? {...school, isSaved: !school.isSaved} 
            : school
          ));
    };
    
  } catch (err) {
    console.error('Error saving school:', err.message);
  }
};

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
    {
      accessorKey: 'isSaved',
      header: 'Saved',
      size: 150,
      Cell: ({ cell }) => {
        const schoolRow = cell.row.original;
        return (
          <Box
          onClick={() => handleSave(schoolRow.INDEX_NUMBER)}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            p: '0.5rem',
            paddingLeft: '2rem',
            cursor: 'pointer'
          }}
        >
          {cell.getValue() ? (
            <BookmarkIcon sx={{ color: '#006fff' }} />
          ) : (
            <BookmarkBorderIcon sx={{ color: '#006fff' }} />
          )}
        </Box>
        )}
    }
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