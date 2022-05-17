import React, { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import Alert from '../../components/common/Alert';
import styled from 'styled-components';

import Editor from '../../components/blog/Editor';

// MUI
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import SelectSingle from '../../components/input/SelectSingle';
import { ButtonEnviar, ButtonLimpiar } from '../../components/buttons/Button';

const AddBlog = () => {
   // para el editor inicialmente ocupaba este
   // const [content, setContent] = useState('');

   const {
      isLoading,
      showAlert,
      displayAlert,
      titleBlog,
      descBlog,
      category,

      categoryOptions,
      changeStateValues,
      isEditingBlog,
      editBlog,
      clearValues,
      createBlog,
   } = useAppContext();

   useEffect(() => {
      // Anything in here is fired on component mount.
      return () => {
         // Anything in here is fired on component unmount.
         clearValues();
      };
      // si pongo la dependencia "clearValues" se hace render infinito
   }, []);

   // PRIMERO CAMBIO TODO EN EL STATE ( LOS DATOS DE LA RECETA ), Y LUEGO LO MANDO
   const handleBlogInput = e => {
      if (!e.target) {
         const name = 'descBlog';
         const value = e;

         changeStateValues({ name, value });
      } else {
         const name = e.target.name;
         const value = e.target.value;

         changeStateValues({ name, value });
      }
   };

   // al picarle a editar ( en Recipe.js ) ==> se meten los valores de ese trabajo en el state y se manda a la pag de crear-recipe con estos valores pre-llenados, aqui se editan y se manda el patch a la DB

   const handleSubmit = e => {
      e.preventDefault();

      // como sea lo pruebo en la API y en la DB
      // prettier-ignore
      if (!titleBlog || !descBlog || !category) {
         displayAlert();
         return;
      }

      if (isEditingBlog) {
         editBlog();
         return;
      }

      // lo manda a crear con los valores q tiene en el state
      createBlog();

      // limpia campos tras crear blog
      clearValues();
   };

   return (
      <Container sx={{ mt: 2 }} maxWidth="lg">
         <Box
            sx={{
               borderRadius: 'var(--borderRadius)',
               width: '100%',
               background: 'var(--white)',
               padding: '3rem 2rem 4rem',
               boxShadow: 'var(--shadow-2)',
            }}
         >
            <Container maxWidth="md">
               <Paper
                  component="form"
                  sx={{
                     margin: 0,
                     borderRadius: 0,
                     boxShadow: 'none',
                     padding: 0,
                     width: '100%',
                  }}
               >
                  <h3>{isEditingBlog ? 'editar blog' : 'añadir blog'} </h3>
                  {showAlert && <Alert />}

                  <TextField
                     label="Título"
                     multiline
                     fullWidth
                     maxRows={2}
                     name="titleBlog"
                     value={titleBlog}
                     onChange={handleBlogInput}
                     sx={{ mb: 2 }}
                  />

                  <SelectSingle
                     title="Categoría"
                     name="category"
                     value={category}
                     changeValueInState={handleBlogInput}
                     selectOptions={categoryOptions}
                     fullWidth
                     sx={{ mb: 2 }}
                  />

                  <Wrapper>
                     <Editor
                        initialValue={descBlog}
                        setContent={handleBlogInput}
                     />
                  </Wrapper>

                  <Stack
                     direction={{ xs: 'column', sm: 'row' }}
                     spacing={2}
                     justifyContent="flex-end"
                     alignItems="flex-end"
                     sx={{ mt: 2 }}
                  >
                     <ButtonEnviar
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                        clearValues={clearValues}
                     />
                     <ButtonLimpiar onClick={clearValues} />
                  </Stack>
               </Paper>
            </Container>
         </Box>
      </Container>
   );
};

export default AddBlog;

const Wrapper = styled.section`
   .jodit-react-container {
      width: 100%;

      p {
         margin-bottom: 0.5rem;
         max-width: 40em;
         color: #6e7785;
      }

      ul {
         list-style-type: disc;
         margin-top: 0;
         padding-top: 0;
         padding-bottom: 0.5rem;
         padding-left: 2rem;
      }
   }

   .jodit-status-bar {
      visibility: collapse;
   }
`;
