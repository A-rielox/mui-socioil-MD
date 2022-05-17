import { useAppContext } from '../../context/appContext';
import Loading from '../common/Loading';
import { useEffect } from 'react';
import PageBtnContainer from '../PageBtnContainer';
import styled from 'styled-components';

// MUI
import RecipeMui from './RecipeMui';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const RecipesContainer = () => {
   // prettier-ignore
   const {
      getRecipes, recipes, isLoading, page, totalRecipes, search, searchOil,
      searchProblem, sort, numOfPages } = useAppContext();

   useEffect(() => {
      getRecipes(/* { onHold: false } */);
   }, [search, searchOil, searchProblem, sort, page]);

   if (isLoading) {
      return <Loading center />;
   }

   if (recipes.length === 0) {
      return <NoEncontramos>No encontramos recetitas 😳 ...</NoEncontramos>;
   }

   return (
      <Container sx={{ my: 2 }} maxWidth="lg">
         <h5>
            {totalRecipes} receta{recipes.length > 1 && 's'} encontrada
            {recipes.length > 1 && 's'}
         </h5>

         <Box
            sx={{
               display: 'grid',
               gridTemplateColumns: {
                  sm: '1fr',
                  md: 'repeat(2, 1fr)',
               },
               gap: 4,
            }}
         >
            {recipes.map(recipe => {
               return <RecipeMui key={recipe._id} {...recipe} />;
            })}
         </Box>

         {numOfPages > 1 && <PageBtnContainer />}
      </Container>
   );
};

export default RecipesContainer;

const NoEncontramos = styled.h2`
   text-align: center;
   margin-top: 4rem;
   text-transform: none;
`;
