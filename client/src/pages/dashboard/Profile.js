import Alert from '../../components/common/Alert';
import { useState } from 'react';
import { useAppContext } from '../../context/appContext';

// MUI

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { ButtonEnviar } from '../../components/buttons/Button';
import SelectSingle from '../../components/input/SelectSingle';

const Profile = () => {
   const { user, showAlert, displayAlert, updateUser, isLoading } =
      useAppContext();
   const [name, setName] = useState(user?.name);
   const [email, setEmail] = useState(user?.email);
   const [lastName, setLastName] = useState(user?.lastName);
   const [location, setLocation] = useState(user?.location);
   const [level, setLevel] = useState(user?.level);

   const levelList = [
      'distribuidor',
      'estrella',
      'estrella mayor',
      'ejecutivo',
      'plata',
      'oro',
      'platino',
      'diamante',
      'diamante corona',
      'diamante corona real',
   ];

   const handleSubmit = e => {
      e.preventDefault();

      if (!name || !email || !lastName || !location) {
         displayAlert();
         // 👇    ⭐⭐⭐ para q no siga con el updateUser
         return;
      }

      updateUser({ name, email, lastName, location, level });
   };

   return (
      <Container sx={{ mt: 2 }} maxWidth="lg">
         <Paper
            sx={{
               borderRadius: 'var(--borderRadius)',
               width: '100%',
               padding: '3rem 2rem 4rem',
               boxShadow: 'var(--shadow-2)',
            }}
         >
            <Container maxWidth="md">
               <h3>perfil </h3>
               {showAlert && <Alert />}

               <Stack direction="column">
                  <Stack
                     direction={{ xs: 'column', sm: 'row' }}
                     spacing={2}
                     justifyContent="space-between"
                     alignItems={{ xs: 'center', sm: 'flex-start' }}
                     sx={{ mb: 2 }}
                  >
                     <TextField
                        label="nombre"
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}
                     />

                     <TextField
                        label="apellido"
                        name="lastName"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}
                     />
                  </Stack>

                  <Stack
                     direction={{ xs: 'column', sm: 'row' }}
                     spacing={2}
                     justifyContent="space-between"
                     alignItems={{ xs: 'center', sm: 'flex-start' }}
                     sx={{ mb: 2 }}
                  >
                     <TextField
                        label="correo"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}
                     />

                     <TextField
                        label="ubicación"
                        name="location"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        sx={{ flex: 1, width: { xs: '100%', sm: 'auto' } }}
                     />
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                     <Box mr={2} sx={{ width: '100%' }}>
                        <SelectSingle
                           title="nivel"
                           name="level"
                           value={level}
                           changeValueInState={e => setLevel(e.target.value)}
                           selectOptions={levelList}
                           sx={{ width: { xs: '100%', sm: '50%' } }}
                        />
                     </Box>
                  </Stack>

                  <Box
                     sx={{
                        mt: 2,
                        display: 'flex',
                        justifyContent: 'flex-end',
                     }}
                  >
                     <ButtonEnviar
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                     />
                  </Box>
               </Stack>
            </Container>
         </Paper>
      </Container>
   );
};

export default Profile;
