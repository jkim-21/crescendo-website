import React from 'react';

const TableRows = ({ data, isPairing, type, showSpots }) => {
  return data.map((item, index) => (
    <tr key={index}>
      <td>{isPairing ? item.mentorName : item["Name (First, Last)"]}</td>
      <td>{isPairing ? item.mentorContact : item["Phone Number or Preferred Method of Contact Info"]}</td>
      <td>{isPairing ? item.menteeName : item.Instrument}</td>
      <td>{isPairing ? item.menteeContact : item["Online or In-Person"]}</td>
      {isPairing && <td>{item.mentorInstrument}</td>}
      {isPairing && <td>{item.menteeInstrument}</td>}
      {isPairing && <td>{item.timeOfLesson}</td>}
      {isPairing && <td>{item.inPersonOrOnline}</td>}
      {!isPairing && <td>{type}</td>}
      {!isPairing && (
        <td>
          {[
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
          ].map(day => item[`When are you available for lessons (EST)? Please select times that work for you!  [${day}]`])
            .filter(Boolean)
            .join(', ')}
        </td>
      )}
      {!isPairing && showSpots && type === 'Mentor' && <td>{item["How many Lessons can you give a week? (For Mentors Only)"]}</td>}
      {!isPairing && showSpots && type === 'Mentee' && <td></td>}
    </tr>
  ));
};

export default TableRows;
