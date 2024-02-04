import styles from '../style'
import { discount } from '../assets';
import { GetStarted, Slideshow } from '.';


const Hero = () => {
  return (
    <section id='home' className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col`}>
        <div className='flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2'>
          <img
            src={discount}
            alt='discount'
            className='w-[32px] h-[32px]'
          />
          <p className={`${styles.paragraph} ml-2`}>
            <span className='text-white'>100%</span> of proceeds go to Students in Need
          </p>
        </div>
        <div className='flex flex-row justify-between items-center w-full'>
          <h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]'>
            Music <br className='sm:block hidden'/> {" "}
            <span className='text-gradient'>Motivates</span> {" "}
          </h1>
          <div className='ss:flex hidden md:mr-4 mr-0'>
          </div>
        </div>
        <h1 className='font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px] w-full'>
          Meaning.
        </h1>
        <p className={`${styles.paragraph} max-w-[600px] mt-5`}>
        We are Crescendo for a Cause, a registered 501(c)(3) non-profit and Presidential Volunteer Service Award certifying organization. Our mission is to improve music education in underserved areas and to utilize music performance as a vehicle for advocacy and community service.
        </p>
        <div className='relative'>
          <div className="absolute z-[1] w-[350px] h-[32rem] rounded-full white__gradient left-[5rem] bottom-0" />
        </div>
        
      </div>
      <div className={`flex-1 md:my-0 my-10 relative flex item-center`}>
        <Slideshow/>
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted/>
      </div>
    </section>
  )
}

export default Hero
