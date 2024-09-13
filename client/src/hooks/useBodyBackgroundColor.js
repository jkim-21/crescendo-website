import { useEffect } from "react";

const useBodyBackgroundColor = (color) => {
  useEffect(() => {
    // Set the body background color when the component mounts
    document.body.style.backgroundColor = color;

    // Cleanup: Reset the body background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [color]);
};

export default useBodyBackgroundColor;
