import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DataFetchingComponent() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [locationState, setLocationState] = useState(''); //cant just do state because state is another real command
  const itemsPerPage = 10;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!locationState && !city && !street) {
        throw new Error('Give at least one arguement');
      }
      const response = await fetch(`/api/data?city=${city}&locationState=${locationState}&street=${street}`);
      if (!response.ok) {
        throw new Error('response not ok !');
      }
      const result = await response.json();
      setData(result);
      setCurrentPage(1); // Reset to first page when new data is fetched
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  //goes to the next page (the next 10 or whatever you choose for items per page)
  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  //goes back a page in the same way handlenextpage goes forward a page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //abstract the table out of the return so its easier to read both

  const renderTable = () => {

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentData = data.slice(startIdx, endIdx);

    if (currentData.length === 0) return <p>No data available</p>; // :(  </3  >:|

    //overflow: chttps://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x
    //w-full: width full
    //border-collapse border: https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse makes it so borders overlap
    //max-w-6xl: font size relative to element size
    //mx-auto: margin x auto
    //my-10: margin y 10
    //min-h-[80vh]: min height of 80% the window size

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
                {Object.entries(item).map
                (([key,value] , idx) => ( //map each item by its index to a "td" table data cell in the table
                  <td key={idx} className="border border-gray-400 p-2">
                    {key === 'SCH_NAME' ? (
                      <button
                        onClick={() => navigate(`/tools/email-finder-system/display/${encodeURIComponent(value)}`)}
                        className="text-blue-500 hover:font-underline"
                      >
                        {value}
                      </button>
                    ) : (
                      value
                    )}
                  </td>
                ))
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  //implemented buttons / filters etc: city and state
  //removed indexes - (not neccesary for searc page - means nothing to anyone but us)

  return (

    <div className="flex flex-col items-center bg-white p-6 rounded shadow-lg max-w-6xl mx-auto my-10 min-h-[80vh]">
      <div className="mb-4 flex space-x-4">
        <button 
          className="p-2 border-2 border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
          onClick={fetchData}
        >
          Fetch Data
        </button>

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border border-gray-400 rounded"
        />

        <input
          type="text"
          placeholder='Street'
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="p-2 border border-gray-400 rounded"
        />

        <select
          value={locationState}
          onChange={(e) => setLocationState(e.target.value)}
          className="p-2 border border-gray-400 rounded"
        >
          <option value={""}>Select State</option>
          <option value="mai">Maine</option>
<option value="mass">Massachusetts</option>
<option value="ill">Illinois</option>
        </select>



      </div>

      {loading && <p> Loading... </p>}
      
      {error && <p className="text-red-500 border border-black bg-red-300"> Error: {error} </p>}

      <div className="w-full">

        {renderTable()}

        <div className="flex justify-between mt-4">
          <button 
            className="p-2 border border-gray-400 rounded disabled:opacity-50"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="p-2">Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}</span>

          <button 
            className="p-2 border border-gray-400 rounded disabled:opacity-50"
            onClick={handleNextPage}
            disabled={currentPage >= Math.ceil(data.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataFetchingComponent;