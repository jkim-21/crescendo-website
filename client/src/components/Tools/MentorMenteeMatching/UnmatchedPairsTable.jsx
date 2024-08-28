import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {useAuth} from '../../../context/AuthContext'

const MatchedPairsTable = ({ unmatchedIndividuals }) => {
  const navigate = useNavigate();
  const {user} = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(unmatchedIndividuals)
  }, [unmatchedIndividuals])

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
        accessorKey: 'name',
        header: 'Name',
        size: 150,
    },
    {
        accessorKey: 'type',
        header: 'Type',
        size: 150,
    },
    {
        accessorKey: 'contact',
        header: 'Contact',
        size: 150,
    },
    {
        accessorKey: 'instrument',
        header: 'Instrument',
        size: 150,
    },
    {
        accessorKey: 'lessonType',
        header: 'Lesson Type',
        size: 150,
    },
    {
        accessorKey: 'mondayAvailability',
        header: 'Monday Availability',
        size: 200,
    },
    {
        accessorKey: 'tuesdayAvailability',
        header: 'Tuesday Availability',
        size: 250,
    },
    {
        accessorKey: 'wednesdayAvailability',
        header: 'Wednesday Availability',
        size: 250,
    },
    {
        accessorKey: 'thursdayAvailability',
        header: 'Thursday Availability',
        size: 250,
    },
    {
        accessorKey: 'fridayAvailability',
        header: 'Friday Availability',
        size: 200,
    },
    {
        accessorKey: 'saturdayAvailability',
        header: 'Saturday Availability',
        size: 250,
    },
    {
        accessorKey: 'sundayAvailability',
        header: 'Sunday Availability',
        size: 150,
    },
    {
        accessorKey: 'availabilityLeft',
        header: 'Availability Left',
        size: 150,
    },
  ], [navigate]);

  const table = useMaterialReactTable({
    columns,
    data,
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 30, 50],
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
        maxHeight: '85vh'
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