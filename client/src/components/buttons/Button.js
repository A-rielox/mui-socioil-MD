import Button from '@mui/material/Button';

import SendIcon from '@mui/icons-material/Send';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

export const ButtonEnviar = ({ handleSubmit, isLoading, clearValues }) => {
   return (
      <Button
         variant="contained"
         startIcon={<SendIcon />}
         disabled={isLoading}
         sx={{
            width: { xs: '100%', sm: '25%' },
            bgcolor: 'var(--primary-500)',
            '&:hover': {
               bgcolor: 'var(--primary-100)',
               color: 'var(--primary-700)',
            },
         }}
         onClick={e => {
            handleSubmit(e);
            clearValues();
         }}
      >
         enviar
      </Button>
   );
};

export const ButtonLimpiar = ({ onClick }) => {
   return (
      <Button
         variant="contained"
         startIcon={<CleaningServicesIcon />}
         sx={{
            width: { xs: '100%', sm: '25%' },
            bgcolor: 'var(--primary-700)',
            '&:hover': {
               backgroundColor: 'var(--primary-100)',
               color: 'var(--primary-700)',
            },
         }}
         onClick={e => {
            e.preventDefault();
            onClick();
         }}
      >
         limpiar
      </Button>
   );
};
