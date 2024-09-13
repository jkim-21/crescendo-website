import React, { useState, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HelpModal from './HelpModal';
import {styles} from '../../../style'
import {instructionPieces} from '../../../data/tools-pages'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FileUpload = ({ file, uploading, open, getRootProps, getInputProps, isDragActive, setFile, handleFileUpload }) => {
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

  return (
    <div {...getRootProps ({ className: 'soft-pastel-gradient-bg flex flex-col items-center justify-center w-full h-[25rem] rounded-2xl light-blue-border rounded-[1.25rem] bg-cover bg-center border-[1px] strong-box-shadow' })}>
      <input {...getInputProps()} />
      <div className="dark-text flex flex-col justify-center items-center gap-[1.5rem] mx-[1rem] text-center w-full h-full">
        {isDragActive ? (
          <div className='flex flex-col justify-center items-center gap-[1rem] w-[95%] h-[80%] mx-[1rem] border-[2px] border-dashed gray-border bg-[#edf2ff] rounded-[1.25rem] font-[500]'>
            <FileUploadIcon/>
            <p className=''>
              Drop the file here...
            </p>
          </div>
        ) : (
          <>
            <CloudUploadIcon />
            {!file && !uploading && (
              <div className='flex flex-col items-center gap-[1rem]'>
                <p>
                  Generate a .xslx file from your google form mentor/mentee responses, then drag and drop that file here!
                </p>
                <p>
                  <span className="opacity-[0.5]">
                    OR
                  </span>
                </p>
                <button className="px-[0.5rem] py-[0.75rem] bg-transparent rounded-[0.25rem] cursor-pointer border-[2px] border-[var(--dark-blue)] text-[var(--dark-blue)] dropzone-button" onClick={open}>
                  Click to Browse File
                </button>
                <div className="text-[0.75rem] cursor-pointer opacity-75 hover:opacity-100" onClick={() => setShowModal(true)}>
                  Need help?
                </div>
              </div>
            )}
            {file && !uploading && (
              <div className='flex flex-col items-center gap-[1.5rem]'>
                <div className='flex gap-[1rem] white-bg px-[2rem] py-[1rem] rounded-[0.5rem] lightest-box-shadow'>
                  <UploadFileIcon/>
                  <p className=''>
                    {file.name}
                  </p>
                </div>
                
                <div className='flex gap-[2rem]'>
                  <button
                    className="px-[1rem] py-[0.5rem] cursor-pointer rounded-[0.5rem] lighter-gray-bg hover:bg-gray-300"
                    onClick={() => setFile(null)}
                  >
                    Choose a Different File
                  </button>
                  <button
                    className="px-[1rem] py-[0.5rem] bg-[var(--sea-blue)] rounded-[0.5rem] cursor-pointer white-text upload-button"
                    onClick={handleFileUpload}
                  >
                    Upload File
                  </button>
                </div>
              </div>
            )}
            {uploading && (
              <div className='text-center p-[1rem] rounded-[0.5rem]'>
                <p>
                  Uploading...
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <HelpModal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        instructionPieces={instructionPieces}
      />
    </div>
  );
};

export default FileUpload;
