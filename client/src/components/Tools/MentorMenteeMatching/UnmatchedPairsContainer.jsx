import React from 'react';
import {UnmatchedPairsTable} from '../../../components'
import {styles} from '../../../style'

const UnmatchedPairsContainer = ({ unmatchedIndividuals, jsonToXLSX, textFormat, buttonFormat }) => {
  return (
    <div className="w-full rounded-[8px]">
      <div className="header-container flex justify-between items-center mb-[1rem]">
        <h4 className={`${textFormat ? textFormat : styles.heading4}`}>
          Unmatched Mentors and Mentees
        </h4>
        <button 
          onClick={() => jsonToXLSX(unmatchedIndividuals, 'unmatched-indviduals.xlsx')}
          className={`${buttonFormat ? buttonFormat : 'px-[1.25rem] py-[0.75rem]'} border-none white-text text-center rounded-md light-navy-bg hover:bg-[var(--navy)]`} 
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
