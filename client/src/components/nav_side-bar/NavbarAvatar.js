import React from 'react';

// import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const NavbarAvatar = () => {
   const [anchorElUser, setAnchorElUser] = React.useState(null);

   const handleOpenUserMenu = event => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   return (
      <Box sx={{ flexGrow: 0 }}>
         <Tooltip title="Log out">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               <Avatar
                  alt="Remy Sharp"
                  src="" /* sx={{ width: 56, height: 56 }} */
               />
            </IconButton>
         </Tooltip>

         <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
         >
            <MenuItem /* key={setting} */ onClick={handleCloseUserMenu}>
               <Typography textAlign="center">Log out</Typography>
            </MenuItem>
         </Menu>
      </Box>
   );
};

export default NavbarAvatar;
