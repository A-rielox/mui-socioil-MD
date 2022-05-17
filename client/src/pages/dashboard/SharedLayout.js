import { useAppContext } from '../../context/appContext';
import { Outlet } from 'react-router-dom';

import SidebarBigMui from '../../components/nav_side-bar/SidebarBigScreen';
import SidebarSmallMui from '../../components/nav_side-bar/SidebarSmallMui';
import Box from '@mui/material/Box';

const SharedLayout = () => {
   const { user } = useAppContext();

   return (
      <Box
         sx={{
            display: 'flex',
            flexDirection: { xs: 'column', eighthundred: 'row' },
         }}
      >
         <Box sx={{ display: { xs: 'none', eighthundred: 'block' } }}>
            <SidebarBigMui />
         </Box>
         <Box sx={{ display: { xs: 'block', eighthundred: 'none' } }}>
            <SidebarSmallMui />
         </Box>

         <Box sx={{ flexGrow: 1, mt: 8 }}>
            <Outlet />
         </Box>
      </Box>
   );
};

export default SharedLayout;
