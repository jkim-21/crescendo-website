import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {useAuth} from '../../../context/AuthContext'

const MatchedPairsTable = ({ studentPairings }) => {
  const baseURL = import.meta.env.VITE_HEROKU_BASE_URL || "";
  const navigate = useNavigate();
  const {user} = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(studentPairings)
  }, [studentPairings])

  const handleSave = async (schoolIndex) => {
    if (!user || !user.uid || !schoolIndex) return;
  
    try {
      const response = await fetch(`${baseURL}/api/save-school`, {
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
        accessorKey: 'mentorName',
        header: 'Mentor Name',
        size: 150,
    },
    {
        accessorKey: 'mentorContact',
        header: 'Mentor Contact',
        size: 150,
    },
    {
        accessorKey: 'menteeName',
        header: 'Mentee Name',
        size: 150,
    },
    {
        accessorKey: 'menteeContact',
        header: 'Mentee Contact',
        size: 150,
    },
    {
        accessorKey: 'mentorInstrument',
        header: 'Mentor Instrument',
        size: 150,
    },
    {
        accessorKey: 'menteeInstrument',
        header: 'Mentee Instrument',
        size: 150,
    },
    {
        accessorKey: 'timeOfLesson',
        header: 'Time of Lesson (day, time)',
        size: 275,
    },
    {
        accessorKey: 'inPersonOrOnline',
        header: 'In-Person or Online',
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
            backgroundColor:'#f0f0f0',
            fontWeight: 'bold'
        }
    },
    muiTopToolbarProps: {
        sx: {
          backgroundColor: '#f0f0f0'
        },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: '85vh',
      }
    }
  });

  return (
    <div className="overflow-y-auto overflow-x-auto shadow-md rounded-[0.75rem]">
      <MaterialReactTable
        table={table}/>
    </div>
  )
};

export default MatchedPairsTable;