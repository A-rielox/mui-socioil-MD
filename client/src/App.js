import { Routes, Route, useLocation } from 'react-router-dom';
import { Landing, Register, Error, ProtectedRoute } from './pages';
import {
   AddRecipe,
   AllRecipes,
   Profile,
   SharedLayout,
   Stats,
   AllBlogs,
   AddBlog,
} from './pages/dashboard';

import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

function App() {
   const location = useLocation();

   return (
      <Section>
         <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
               <Route
                  path="/"
                  element={
                     <ProtectedRoute>
                        <SharedLayout />
                     </ProtectedRoute>
                  }
               >
                  <Route index element={<Stats />} />
                  <Route path="all-recipes" element={<AllRecipes />} />
                  <Route path="add-recipe" element={<AddRecipe />} />

                  <Route path="all-blogs" element={<AllBlogs />} />
                  <Route path="add-blog" element={<AddBlog />} />

                  <Route path="profile" element={<Profile />} />
               </Route>

               <Route path="/register" element={<Register />} />

               <Route path="/landing" element={<Landing />} />

               <Route path="*" element={<Error />} />
            </Routes>
         </AnimatePresence>
      </Section>
   );
}

export default App;

const Section = styled.section`
   /* overflow-x: hidden; */ // me echaba a perder la position: stycky de sidebar y navbar
`;
