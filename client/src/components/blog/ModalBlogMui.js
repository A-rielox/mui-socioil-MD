import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import ModalBlogMuiContent from './ModalBlogMuiContent';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   // width: 'auto',
   width: { xs: '95%', md: 'auto' },
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   // p: 4,
};

export default function TransitionsModal({
   _id,
   title,
   desc,
   category,
   createdAt,
   createdBy,
   handleClose,
   modalOpen,
}) {
   return (
      <div>
         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={modalOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500,
            }}
         >
            <Fade in={modalOpen}>
               <Box sx={style}>
                  <ModalBlogMuiContent
                     _id={_id}
                     title={title}
                     desc={desc}
                     category={category}
                     createdAt={createdAt}
                     createdBy={createdBy}
                     handleClose={handleClose}
                  />
               </Box>
            </Fade>
         </Modal>
      </div>
   );
}
