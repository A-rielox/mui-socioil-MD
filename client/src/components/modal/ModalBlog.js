import { motion } from 'framer-motion';
import DisplayedBlog from './DisplayedBlog';
import Backdrop from './Backdrop';

const dropIn = {
   hidden: {
      y: '-100vh',
      opacity: 0,
   },
   visible: {
      y: 0,
      opacity: 1,
      transition: {
         duration: 0.2,
         type: 'spring',
         damping: 25,
         stiffness: 500,
      },
   },
   exit: { x: '-100vw', opacity: 0 },
};

const ModalBlog = ({ handleClose, blogOpened }) => {
   console.log('modal blog');

   return (
      <Backdrop onClick={handleClose}>
         <motion.div
            onClick={e => e.stopPropagation()}
            className="modal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
         >
            <DisplayedBlog
               {...blogOpened}
               handleClose={handleClose} /* openModal={open} */
            />
            {/* <button onClick={handleClose}>Close</button> */}
         </motion.div>
      </Backdrop>
   );
};

export default ModalBlog;
