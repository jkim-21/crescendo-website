import "react-slideshow-image/dist/styles.css";

const styles = {
  boxWidth: "max-w-[90%] xl:max-w-[1280px]",
  maxBoxWidth: "xl:max-w-[1280px]",

  heading1:
    "font-bold text-[2.5rem] md:leading-[4.5rem] md:text-[3.25rem] lg:text-[3.75rem] lg:leading-[5rem]",
  heading2: "font-bold text-[2.5rem] lg:text-[3rem]",

  heading3: "font-bold text-[1.5rem] lg:text-[2rem]",
  heading4: "font-medium text-[1.25rem] lg:text-[1.5rem]",
  heading5: "font-medium text-[1rem] lg:text-[1.25rem]",

  paragraph: "font-normal text-[1rem] leading-[1.5rem] lg:leading-[1.875rem]",
  subparagraph:
    "font-normal text-[0.875rem] leading-[1.25rem] lg:leading-[1.5rem] lg:text-[1rem] ",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "px-[4rem]",
  paddingY: "pt-[2rem] pb-[4rem] md:pt-[4rem] md:pb-[6rem]",
  paddingB: "pb-[4rem]",
  padding: "px-[4rem] py-[4rem]",

  marginX: "mx-[1.5rem] lg:mx-[4rem]",
  marginY: "my-[1.5rem] lg:my-[4rem]",
};

const donationStyle = {
  outlinedInputStyle: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c9cfd7",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c9cfd7",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3272e6",
    },
  },
  buttonStyle: {
    backgroundColor: "#3874e4",
    color: "white",
    "&:hover": { backgroundColor: "#2e66cf" },
  },

  cancelButtonStyle: {
    color: "#3874e4",
    "&:hover": { backgroundColor: "#ebf1fc" },
  },
};

export { styles, donationStyle };
