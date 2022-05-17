import Loading from '../common/Loading';

import { FaCalendarAlt } from 'react-icons/fa';
import { BsArrowRightSquareFill } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import moment from 'moment';
import RecipeInfo from '../common/RecipeInfo';
import styled from 'styled-components';

// MUI

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ButtonEdit, ButtonDelete } from '../buttons/ButtonsUser';

const News = ({
   _id,
   title,
   desc,
   createdAt,
   createdBy,
   // handleClose,

   openModal,
}) => {
   const { setEditBlog, deleteBlog, user } = useAppContext();

   if (!_id) {
      return <Loading center />;
   }

   // arreglo para nombre a desplegar red red pendiente cortar a 1er nombre red red

   // fecha a despegar
   let date = moment(createdAt);
   date = date.format('MMM, YYYY');

   return (
      <Paper elevation={3} sx={paperStyles}>
         <Box sx={titleStyles}>
            <Title>{title}</Title>
         </Box>

         <ContentCenterWrapper>
            <div
               className="content-center"
               dangerouslySetInnerHTML={{ __html: desc }}
            ></div>
         </ContentCenterWrapper>

         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'spaceBetween',
                  alignItems: 'center',
               }}
            >
               {(user._id === createdBy || user.role === 'admin') && (
                  <Stack
                     direction="row"
                     spacing={2}
                     justifyContent={{ xs: 'center', sm: 'flex-start' }}
                     alignItems="flex-end"
                     sx={{ mt: 2, flexGrow: 1 }}
                  >
                     <Box sx={{ width: { xs: '50%', sm: 'min-content' } }}>
                        <Link
                           to="/add-blog"
                           onClick={() => {
                              setEditBlog(_id);
                           }}
                        >
                           <ButtonEdit />
                        </Link>
                     </Box>

                     <ButtonDelete
                        deleteRecipe={() => deleteBlog(_id)}
                        id={_id}
                     />
                  </Stack>
               )}

               <Box display={{ xs: 'none', sm: 'inline-block' }}>
                  <RecipeInfo icon={<FaCalendarAlt />} text={date} />
               </Box>
            </Box>

            {user.role === 'admin' && (
               <BtnEditWrapper>
                  <button
                     type="button"
                     className={`btn btn-edit`}
                     onClick={() => openModal(_id)}
                  >
                     Editar Admin
                     <span className="edit-success">👍</span>
                     <BsArrowRightSquareFill />
                  </button>
               </BtnEditWrapper>
            )}
         </Box>
      </Paper>
   );
};

const titleStyles = {
   padding: '0 1.5rem',
   borderBottom: '1px solid var(--grey-100)',
   display: 'grid',
   alignItems: 'center',
   // height: '100px',
};

const paperStyles = {
   maxWidth: 900,
   marginTop: '50px',
   backgroundColor: 'var(--primary-50)',
   height: 'min-content',
   mx: { sm: 'auto' }, // xel grid 1 columna en sm

   p: 4,

   border: '12px double var(--primary-700)',
};

export default News;

const ContentCenterWrapper = styled.div`
   .content-center {
      border-bottom: 1px solid var(--grey-100);

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

   .content-center > p > img {
      max-width: 100% !important;
      height: auto !important;
   }
`;

const BtnEditWrapper = styled.div`
   .btn-edit {
      width: 100%;

      margin-top: 1rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;

      position: relative;
      /*      👍           */
      .edit-success {
         display: none;
         position: absolute;
      }
      .ready {
         display: block;
         right: 20px;
      }
   }
`;

const Title = styled.h2`
   color: var(--primary-700);
   text-shadow: 1px 0px 1px #cccccc, 0px 1px 1px #eeeeee, 2px 1px 1px #cccccc,
      1px 2px 1px #eeeeee, 3px 2px 1px #cccccc, 2px 3px 1px #eeeeee,
      4px 3px 1px #cccccc, 3px 4px 1px #eeeeee, 5px 4px 1px #cccccc,
      4px 5px 1px #eeeeee, 6px 5px 1px #cccccc, 5px 6px 1px #eeeeee,
      7px 6px 1px #cccccc;
   color: var(--primary-700);

   font-weight: bolder;
`;
