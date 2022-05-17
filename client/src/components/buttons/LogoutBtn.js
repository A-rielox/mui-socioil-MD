import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useAppContext } from '../../context/appContext';

export default function BasicMenu() {
   const { logoutUser, user } = useAppContext();

   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const handleClick = event => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const menuStyles = {
      '& .MuiMenu-list': {
         backgroundColor: 'var(--primary-50)',
         color: 'var(--primary-700)',
         '&:hover': {
            bgcolor: 'var(--primary-100)',
            color: 'var(--primary-700)',
         },
      },
   };

   return (
      <div>
         <Button
            // variant="contained"
            startIcon={<PersonIcon />}
            endIcon={<ArrowDropDownIcon />}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
               color: 'var(--primary-700)',
               '&:hover': {
                  bgcolor: 'var(--primary-100)',
                  color: 'var(--primary-700)',
               },
            }}
         >
            {user?.name}
         </Button>
         <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               'aria-labelledby': 'basic-button',
            }}
            sx={menuStyles}
         >
            <MenuItem
               onClick={() => {
                  handleClose();
                  logoutUser();
               }}
            >
               👋 Salir
            </MenuItem>
         </Menu>
      </div>
   );
}
