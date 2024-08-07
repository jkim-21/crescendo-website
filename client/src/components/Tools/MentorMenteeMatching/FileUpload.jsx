import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HelpModal from './HelpModal';
import {instructions} from '../../../assets'; // Update the path to your image

const FileUpload = ({ onDrop, file, uploading, open, getRootProps, getInputProps, isDragActive, setFile, handleFileUpload }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div {...getRootProps({ className: 'soft-pastel-bg dropzone flex flex-col items-center justify-center w-full h-96 rounded-2xl cursor-pointer light-blue-border border-[1px]' })}>
      <input {...getInputProps()} />
      <div className="dark-text dropzone-content flex flex-col items-center text-center">
        <CloudUploadIcon className="text-8xl" />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <>
            {!file && !uploading && (
              <div>
                <p>Generate a .xslx file from your google form Mentor/Mentee responses and drop that file here!</p>
                <p><span className="or opacity-50">OR</span></p>
                <button className="dark-text mt-4" onClick={open}>Click to Browse File</button>
                <div className="mt-2 text-xs cursor-pointer opacity-75 hover:opacity-100" onClick={() => setShowModal(true)}>
                  Need help?
                </div>
              </div>
            )}
            {file && !uploading && (
              <>
                <p>{file.name}</p>
                <button className="upload-button mt-4 p-2 rounded-md " onClick={handleFileUpload}>Upload File</button>
                <button 
                  className="choose-different-file-button mt-4 text-gray-600"
                  onClick={() => setFile(null)}
                  style={{ background: 'none', border: 'none' }}
                >
                  Choose a Different File
                </button>
              </>
            )}
            {uploading && (
              <div className="uploading text-center p-4 dark-bg rounded-lg animate-pulse">
                <p>Uploading...</p>
              </div>
            )}
          </>
        )}
      </div>
      <HelpModal showModal={showModal} setShowModal={setShowModal} imageUrl={instructions} />
    </div>
  );
};

export default FileUpload;
