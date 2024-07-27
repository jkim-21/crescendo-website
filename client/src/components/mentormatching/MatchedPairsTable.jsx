import React from 'react';
import TableRows from './TableRows';
import { tableHeaders } from './data';

const MatchedPairsTable = ({ pairings }) => {
  return (
    <div className="pairings w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg mt-8">
      <div className="header-container flex justify-between items-center mb-8">
        <h2 className="table-title text-xl font-bold">Matched Mentor-Mentee Pairs</h2>
        <button className="download-button p-2 bg-blue-700 text-white rounded-md hover:bg-blue-800" onClick={() => jsonToXLSX(pairings, 'pairings.xlsx')}>Download Matched Pairs as XLSX</button>
      </div>
      {pairings.length > 0 ? (
        <table className="pairings-table w-full border-collapse mt-4">
          <thead>
            <tr>
              {tableHeaders.matchedPairs.map((header, index) => (
                <th key={index} className="bg-blue-700 text-white p-2 border">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <TableRows data={pairings} isPairing={true} />
          </tbody>
        </table>
      ) : (
        <p>No pairings found.</p>
      )}
    </div>
  );
};

export default MatchedPairsTable;
