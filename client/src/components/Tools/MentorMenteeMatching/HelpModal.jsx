import React from 'react';

const HelpModal = ({ showModal, setShowModal, imageUrl }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full">
        <button 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" 
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>
        <img src={imageUrl} alt="Instructions" className="w-full h-auto max-h-screen object-contain"/>
      </div>
    </div>
  );
};

export default HelpModal;
