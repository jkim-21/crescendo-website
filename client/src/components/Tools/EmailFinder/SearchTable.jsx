import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchTable = ({ itemsPerPage, currentPage, data }) => {
  const navigate = useNavigate();
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentData = data.slice(startIdx, endIdx);


  if (currentData.length === 0) {
    return (
      <p className='text-center my-[3rem]'>
        No data available
      </p>
    )
  };

  return (
    <div className="overflow-y-auto overflow-x-auto">
      <table className="w-full border-collapse border border-gray-400">
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
      </table>
    </div>
  )
};

export default SearchTable;
