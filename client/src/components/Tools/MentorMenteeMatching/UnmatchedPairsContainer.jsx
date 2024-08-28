import React from 'react';
import {UnmatchedPairsTable} from '../../../components'
import {styles} from '../../../style'

const UnmatchedPairsContainer = ({ unmatchedIndividuals, jsonToXLSX }) => {
  return (
    <div className="w-full p-[2rem] rounded-[8px] overflow-hidden">
      <div className="header-container flex justify-between items-center mb-8">
        <h4 className={`${styles.heading4} mb-[0.75rem] font-[800]`}>
          Unmatched Mentors and Mentees
        </h4>
        <button 
          onClick={() => jsonToXLSX(unmatchedIndividuals, 'unmatched-indviduals.xlsx')}
          className="px-[1.25rem] py-[0.75rem] border-none white-text text-center rounded-md light-navy-bg hover:bg-[var(--navy)]" 
        >
          Download Unmatched Individuals as XLSX
        </button>
      </div>
      {unmatchedIndividuals.length > 0 ? (
        <UnmatchedPairsTable 
          unmatchedIndividuals={unmatchedIndividuals} 
        />
      ) : (
        <p>No unmatched mentors or mentees.</p>
      )}
    </div>
  );
};

export default UnmatchedPairsContainer;
