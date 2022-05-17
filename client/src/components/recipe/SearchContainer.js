import { useAppContext } from '../../context/appContext';

// ---------------- MUI
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import SelectSingle from '../input/SelectSingle';
import { ButtonLimpiar } from '../buttons/Button';

const SearchContainer = () => {
   const {
      isLoading,
      // list4Problems,
      oilsOptions,
      search,
      searchOil,
      searchProblem,
      sort,
      sortOptions,
      changeStateValues,
      clearFilters,
   } = useAppContext();

   // cada vez q cambia uno de estos valores en el context => se llama getRecipes()
   const handleSearch = e => {
      if (isLoading) return;
      const name = e.target.name;
      const value = e.target.value;
      // la fcn q cambia dinámicamente los valores en el state
      changeStateValues({ name, value });
   };

   const handleSubmit = e => {
      // e.preventDefault();
      clearFilters();
   };

   const paperStyles = {
      borderRadius: 'var(--borderRadius)',
      width: '100%',
      padding: '3rem 2rem 4rem',
      boxShadow: 'var(--shadow-2)',
   };

   return (
      <Container sx={{ mt: 2 }} maxWidth="lg">
         <Paper sx={paperStyles}>
            <Container maxWidth="md">
               <h4>Búsqueda</h4>

               {/* search position */}
               <Stack direction="column">
                  <Stack
                     direction={{ xs: 'column', sm: 'row' }}
                     spacing={2}
                     sx={{ mb: 2 }}
                  >
                     {/* titulo */}
                     <TextField
                        label="Titulo"
                        placeholder="Que el título contenga..."
                        name="search"
                        value={search}
                        onChange={handleSearch}
                        sx={{ width: { xs: '100%', sm: '50%' } }}
                     />

                     {/* aceite */}
                     <SelectSingle
                        title="Con aceitito"
                        name="searchOil"
                        value={searchOil}
                        changeValueInState={handleSearch}
                        selectOptions={['todos', ...oilsOptions]}
                        sx={{ width: { xs: '100%', sm: '50%' } }}
                     />
                  </Stack>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                     {/* problem */}
                     <TextField
                        label="Con problema"
                        name="searchProblem"
                        value={searchProblem}
                        onChange={handleSearch}
                        sx={{ width: { xs: '100%', sm: '50%' } }}
                     />

                     {/* sort */}
                     <SelectSingle
                        title="Orden"
                        name="sort"
                        value={sort}
                        changeValueInState={handleSearch}
                        selectOptions={sortOptions}
                        sx={{ width: { xs: '100%', sm: '50%' } }}
                     />
                  </Stack>
               </Stack>

               <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <ButtonLimpiar onClick={handleSubmit} />
               </Box>
            </Container>
         </Paper>
      </Container>
   );
};

export default SearchContainer;
