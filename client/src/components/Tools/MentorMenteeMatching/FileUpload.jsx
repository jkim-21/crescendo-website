import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HelpModal from './HelpModal';
import {instructions} from '../../../assets'; // Update the path to your image

const FileUpload = ({ onDrop, file, uploading, open, getRootProps, getInputProps, isDragActive, setFile, handleFileUpload }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div {...getRootProps({ className: 'dropzone flex flex-col items-center justify-center w-full h-96 border-8 border-blue-700 rounded-2xl bg-blue-100 cursor-pointer' })}>
      <input {...getInputProps()} />
      <div className="dropzone-content text-white flex flex-col items-center text-center">
        <CloudUploadIcon className="text-8xl text-white" />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <>
            {!file && !uploading && (
              <div>
                <p>Generate a .xslx file from your google form Mentor/Mentee responses and drop that file here!</p>
                <p><span className="or opacity-50">OR</span></p>
                <button className="text-button-white mt-4" onClick={open}>Click to Browse File</button>
                <div className="mt-2 text-xs text-white cursor-pointer opacity-75 hover:opacity-100" onClick={() => setShowModal(true)}>
                  Need help?
                </div>
              </div>
            )}
            {file && !uploading && (
              <>
                <p>{file.name}</p>
                <button className="upload-button mt-4 p-2 bg-blue-700 text-white rounded-md hover:bg-blue-800" onClick={handleFileUpload}>Upload File</button>
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
              <div className="uploading text-white text-center p-4 bg-white rounded-lg animate-pulse">
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
