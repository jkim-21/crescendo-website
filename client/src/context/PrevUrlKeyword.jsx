import React, { createContext, useContext, useState, useEffect } from 'react';

const PreviousUrlKeywordContext = createContext();

const PreviousUrlKeyword = ({ children }) => {
  const [previousUrlKeyword, setPreviousUrlKeyword] = useState(null);

  return (
    <PreviousUrlKeywordContext.Provider value={{previousUrlKeyword, setPreviousUrlKeyword}}>
      {children}
    </PreviousUrlKeywordContext.Provider>
  );
};

export default PreviousUrlKeyword;

export const usePreviousUrlKeyword = () => useContext(PreviousUrlKeywordContext);