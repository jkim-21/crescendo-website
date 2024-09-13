import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import {styles} from "../../../style"

const HelpModal = ({ showModal, setShowModal, instructionPieces }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative max-h-[80vh] max-w-[56rem] p-[3rem] overflow-scroll bg-[var(--navy)] rounded-[0.5rem] standard-box-shadow w-full">
        <CloseIcon 
          onClick={() => setShowModal(false)}
          className="absolute top-[0.5rem] right-[0.5rem] cursor-pointer"
          sx={{color:'white', fontSize:'2rem'}} 
        />
        <div className='w-full object-contain flex flex-col gap-[1rem] items-center'> 
          <h4 className={`${styles.heading4} white-text text-center mb-[1rem]`}>
            Template for this sign up form can be found in the "Guide to Running a C4C Chapter Document"
          </h4>
          {instructionPieces.map((instructionPiece, i) => (
            <>
              <img
                key={instructionPiece.id}
                src={instructionPiece.img}
                alt={instructionPiece.alt}
                className={`${instructionPiece.className} rounded-[0.5rem] max-h-[20rem] max-w-[35rem]`}
              />
              {i < instructionPieces.length - 1 ? <KeyboardDoubleArrowDownIcon sx={{fontSize:'3rem', color:'white'}}/> : null}
            </>
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;