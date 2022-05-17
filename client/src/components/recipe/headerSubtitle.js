import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

const buttonStyle = {
   py: '0',
   '& .MuiListItemIcon-root': {
      color: 'var(--grey-100)',
      minWidth: 'min-content',
      marginRight: '7px',
      '& svg': {
         width: '0.7rem',
         height: '0.7rem',
      },
   },
   '& .MuiListItemText-root': {
      '& span': {
         color: 'var(--grey-100)',
         whiteSpace: 'nowrap',
      },
   },
};

const headerTitle = problemsList => {
   return (
      <Box>
         <List
            sx={{
               display: 'flex',
               justifyContent: 'center',
               flexWrap: 'wrap',
               py: 0,
            }}
         >
            {problemsList.map((oil, index) => {
               return (
                  <ListItem key={index} disablePadding sx={{ width: 'auto' }}>
                     <ListItemButton sx={buttonStyle}>
                        <ListItemIcon>
                           <DoNotDisturbIcon />
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
