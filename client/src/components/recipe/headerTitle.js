import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import InvertColorsIcon from '@mui/icons-material/InvertColors';

import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const buttonStyle = {
   py: '0',
   '& .MuiListItemIcon-root': {
      color: 'white',
      minWidth: 'min-content',
      marginRight: '3px',
      '& svg': {
         width: '0.7rem',
         height: '0.7rem',
      },
   },
   '& .MuiListItemText-root': {
      '& span': {
         color: 'white',
      },
   },
};

const headerTitle = ({ oilsList, title }) => {
   return (
      <Box>
         <Typography variant="h5">{title}</Typography>

         <Divider sx={{ bgcolor: 'white' }} />

         <List
            sx={{
               display: 'flex',
               justifyContent: 'center',
               py: 0,
               flexWrap: 'wrap',
            }}
         >
            {oilsList.map((oil, index) => {
               return (
                  <ListItem key={index} disablePadding sx={{ width: 'auto' }}>
                     <ListItemButton sx={buttonStyle}>
                        <ListItemIcon>
                           <InvertColorsIcon />
                        </ListItemIcon>

                        <ListItemText primary={oil} />
                     </ListItemButton>
                  </ListItem>
               );
            })}
         </List>
      </Box>
   );
};

export default headerTitle;
