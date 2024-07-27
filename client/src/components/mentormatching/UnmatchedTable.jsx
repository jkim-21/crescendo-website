import React from 'react';
import TableRows from './TableRows';
import { tableHeaders } from './data';

const UnmatchedTable = ({ unmatchedMentees, unmatchedMentors }) => {
  return (
    <div className="unmatched w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg mt-8">
      <div className="header-container flex justify-between items-center mb-8">
        <h2 className="table-title text-xl font-bold">Unmatched Mentors and Mentees</h2>
        <button className="download-button p-2 bg-blue-700 text-white rounded-md hover:bg-blue-800" onClick={() => jsonToXLSX([...unmatchedMentees, ...unmatchedMentors], 'unmatched.xlsx')}>Download Unmatched Pairs as XLSX</button>
      </div>
      {unmatchedMentees.length > 0 || unmatchedMentors.length > 0 ? (
        <table className="pairings-table w-full border-collapse mt-4">
          <thead>
            <tr>
              {tableHeaders.unmatched.map((header, index) => (
                <th key={index} className="bg-blue-700 text-white p-2 border">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <TableRows data={unmatchedMentees} isPairing={false} type="Mentee" showSpots={true} />
            <TableRows data={unmatchedMentors} isPairing={false} type="Mentor" showSpots={true} />
          </tbody>
        </table>
      ) : (
        <p>No unmatched mentors or mentees.</p>
      )}
    </div>
  );
};

export default UnmatchedTable;
