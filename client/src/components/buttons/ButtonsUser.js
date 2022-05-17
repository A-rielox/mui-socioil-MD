import Button from '@mui/material/Button';

export const ButtonUser = ({ user }) => {
   return (
      <Button
         variant="contained"
         // startIcon={<PersonIcon />}
         sx={userStyle}
      >
         {user}
      </Button>
   );
};

export const ButtonLevel = ({ levelToDisplay, colorLevel }) => {
   return (
      <Button variant="contained" sx={levelStyle} className={colorLevel}>
         {levelToDisplay}
      </Button>
   );
};

export const ButtonEdit = () => {
   return (
      <Button variant="contained" sx={editStyle}>
         Editar
      </Button>
   );
};

export const ButtonDelete = ({ deleteRecipe, id }) => {
   return (
      <Button
         variant="contained"
         sx={deleteStyle}
         onClick={() => {
            deleteRecipe(id);
         }}
      >
         Borrar
      </Button>
   );
};

const editStyle = {
   width: { xs: '100%', sm: 'auto' },
   bgcolor: 'var(--green-light)',
   color: 'var(--green-dark)',
   '&:hover': {
      bgcolor: 'var(--green-light)',
      color: 'var(--green-dark)',
   },
   py: 1,
};

const deleteStyle = {
   width: { xs: '50%', sm: 'auto' },
   bgcolor: 'var(--red-light)',
   color: 'var(--red-dark)',
   '&:hover': {
      bgcolor: 'var(--red-light)',
      color: 'var(--red-dark)',
   },
   py: 1,
};

const userStyle = {
   width: { xs: '100%', sm: 'auto' },
   bgcolor: 'var(--primary-500)',
   '&:hover': {
      bgcolor: 'var(--primary-500)',
   },
   py: 1,
};

const levelStyle = {
   width: { xs: '100%', sm: 'auto' },
   // bgcolor: 'var(--primary-500)',
   '&:hover': {
      // bgcolor: 'transparent',
   },
   py: 1,
   '&.distribuidor': {
      background: 'rgba(191, 191, 191, 0.3)',
      color: 'var(--textColor)',
   },
   '&.estrella': {
      background: 'rgba(181, 0, 255, 0.3)',
      color: 'var(--textColor)',
   },
   '&.mayor': {
      background: 'rgba(201, 0, 201, 0.3)',
      color: 'var(--textColor)',
   },
   '&.ejecutivo': {
      background: 'rgba(215, 0, 0, 0.3)',
      color: 'var(--textColor)',
   },
   '&.plata': {
      background: 'rgba(161, 0, 0, 0.3)',
      color: 'var(--textColor)',
   },
   '&.oro': {
      background: 'rgba(243, 255, 0, 0.3)',
      color: 'var(--textColor)',
   },
   '&.platino': {
      background: 'rgba(0, 249, 0, 0.3)',
      color: 'var(--textColor)',
   },
   '&.diamante': {
      background: 'rgba(5, 130, 16, 0.3)',
      color: 'var(--textColor)',
   },
   '&.corona': {
      background: 'rgba(63, 21, 208, 0.3)',
      color: 'var(--textColor)',
   },
   '&.real': {
      background: 'rgba(101, 0, 163, 0.3)',
      color: 'var(--textColor)',
   },
};
