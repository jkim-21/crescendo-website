import 'react-slideshow-image/dist/styles.css'

const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",
  chaptersWidth: "max-w-[1100px]",

  heading2: "font-semibold xs:text-[3rem] text-[2.5rem] xs:leading-[76.8px] leading-[66.8px] w-full",
  paragraphBlack: "font-poppins font-normal text-black text-[18px] leading-[30.8px]",
  paragraphWhite: "font-poppins font-normal text-white text-[18px] leading-[30.8px]",
  paragraphGray: "font-poppins font-normal text-gray-200 text-[18px] leading-[30.8px]",


  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  paddingB: "sm:pb-16 pb-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",
}

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
}



export default styles;