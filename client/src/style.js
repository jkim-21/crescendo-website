import 'react-slideshow-image/dist/styles.css'

const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",
  chaptersWidth: "max-w-[1100px]",

  heading2: "font-bold xs:text-[3rem] text-[2.5rem] xs:leading-[76.8px] leading-[66.8px] w-full",
  paragraphBlack: "font-normal black-color text-[18px] leading-[30.8px]",
  paragraphWhite: "font-normal text-white text-[18px] leading-[30.8px]",
  paragraphGray: "font-normal text-gray-200 text-[18px] leading-[30.8px]",


  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  paddingB: "sm:pb-16 pb-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",
}

const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
}

const donationStyle = {
  outlinedInputStyle: {
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#c9cfd7',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#c9cfd7', 
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#3272e6',
    }
  },
  buttonStyle: {
    backgroundColor:'#3874e4', 
    color:'white',
    "&:hover": {backgroundColor: "#2e66cf"}
  },

  cancelButtonStyle: {
    color:'#3874e4',
    "&:hover": {backgroundColor: "#ebf1fc"}
  }
}


export {layout, styles, donationStyle};