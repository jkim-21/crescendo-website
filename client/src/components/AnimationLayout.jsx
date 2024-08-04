import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AnimationLayout = ({children}) => {

    const pageTransition = {
        hidden: {
            opacity: 0,
            transition: { duration: 0.3, ease: "easeOut" }
        },
        visible: {
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.3, ease: "easeIn" }
        },
    }

    const location = useLocation();

    return (
    <AnimatePresence 
    mode='wait'
    initial='hidden'
    >
        <motion.div 
        key={location.pathname} 
        variants={pageTransition} 
        initial='hidden' 
        animate='visible' 
        exit='exit'
        >
            {children}
        </motion.div>
    </AnimatePresence>
    );
}

export default AnimationLayout;