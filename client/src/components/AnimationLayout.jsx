import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const AnimationLayout = ({children}) => {

    const pageTransition = {
        hidden: {
            opacity: 0,
            transition: { duration: 0 } 
        },
        visible: {
            opacity: 1,
            transition: { duration: 0.75 }
        },
        exit: {
            opacity: 0,
            transition: { duration: 0 } 
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
        exit='exit'>
            {children}
        </motion.div>
    </AnimatePresence>
    );
}

export default AnimationLayout;