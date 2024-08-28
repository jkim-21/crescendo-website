import React from 'react';
import { tableHeaders } from '../../../data/tools-pages';
import {styles} from '../../../style'
import {MatchedPairsTable} from '../../../components'

const MatchedPairsContainer = ({ pairings, jsonToXLSX }) => {
  return (
    <div className="w-full p-[2rem] rounded-[8px]">
      <div className="flex justify-between items-center mb-[2rem]">
        <h2 className={`${styles.heading4} mb-[0.75rem] font-[800]`}>
          Matched Mentor-Mentee Pairs
        </h2>
        <button 
          onClick={() => jsonToXLSX(pairings, 'pairings.xlsx')}
          className="px-[1.25rem] py-[0.75rem] border-none white-text text-center rounded-md light-navy-bg hover:bg-[var(--navy)]" 
        >
          Download the Matched Pairs as an Excel File
        </button>
      </div>
      {pairings.length > 0 ? (
        <MatchedPairsTable 
          studentPairings={pairings} 
        />
      ) : (
        <p>
          No pairings found.
        </p>
      )}
    </div>
  );
};

export default MatchedPairsContainer;
