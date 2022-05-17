import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import { useNavigate } from 'react-router-dom';

import links from '../../utils/links';

export default function MyFab() {
   const navigate = useNavigate();

   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const dialStyles = {
      position: 'absolute',
      top: 2,
      right: 2,
      '& .MuiSpeedDial-fab': {
         color: 'var(--primary-700)',
         backgroundColor: 'var(--primary-50)',
         '&:hover': {
            backgroundColor: 'var(--primary-700)',
            color: 'var(--primary-50)',
         },
      },
      '& .MuiSpeedDialAction-staticTooltipLabel': {
         color: 'var(--primary-700)',
         backgroundColor: 'var(--primary-50)',
         whiteSpace: 'nowrap',
      },
      '& .MuiSpeedDialAction-fab': {
         color: 'var(--primary-700)',
         fontSize: '1.5rem',
         backgroundColor: 'var(--primary-50)',
         '&:hover': {
            backgroundColor: 'var(--primary-700)',
            color: 'var(--primary-50)',
         },
      },
   };

   const boxWrapperStyles = {
      height: 1,
      position: 'relative',
      flexGrow: 1,
      zIndex: '10000',
   };

   return (
      <Box sx={boxWrapperStyles}>
         <Backdrop open={open} />
         <SpeedDial
            ariaLabel="mi fab pulento"
            sx={dialStyles}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="down"
         >
            {links.map(link => {
               const { id, text, path, icon } = link;

               return (
                  <SpeedDialAction
                     key={id}
                     icon={icon}
                     tooltipTitle={text.toUpperCase()}
                     tooltipOpen
                     onClick={() => {
                        handleClose();
                        navigate(`${path}`);
                     }}
                  />
               );
            })}
         </SpeedDial>
      </Box>
   );
}
