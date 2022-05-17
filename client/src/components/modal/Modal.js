import { motion } from 'framer-motion';
import DisplayedRecipe from './DisplayedRecipe';
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

const Modal = ({ handleClose, recipeOpened }) => {
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
            <DisplayedRecipe
               {...recipeOpened}
               handleClose={handleClose} /* openModal={open} */
            />
            {/* <button onClick={handleClose}>Close</button> */}
         </motion.div>
      </Backdrop>
   );
};

export default Modal;
