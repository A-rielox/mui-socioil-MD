import React, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { FaCalendarAlt } from 'react-icons/fa';
import Stack from '@mui/material/Stack';

import Loading from '../common/Loading';
import RecipeInfo from '../common/RecipeInfo';
import { useAppContext } from '../../context/appContext';
import moment from 'moment';
import { ButtonUser, ButtonLevel } from '../buttons/ButtonsUser';

import styled from 'styled-components';

export default function BlogMui({
   _id,
   title,
   desc,
   category,
   createdAt,
   createdBy,
   openModal,
   /* onHold, */
}) {
   const { authFetch } = useAppContext();
   const [blogUser, setBlogUser] = useState(null);

   useEffect(() => {
      const fetchUser = async () => {
         const {
            data: { queryUser },
         } = await authFetch.get(`/auth/getUser?userId=${createdBy}`);

         setBlogUser(queryUser);
      };

      fetchUser();

      return () => {
         setBlogUser(null);
         // ARREGLA
         // Warning: Can't perform a React state update on an unmounted component.
      };
   }, [_id]);

   if (!blogUser) {
      return <Loading center />;
   }

   // arreglo para class del color del nivel
   let colorLevel = blogUser.level.split(' ');
   colorLevel = colorLevel[colorLevel.length - 1];

   // arreglo del string del nivel
   const newStr = blogUser.level.split(' ');
   let levelToDisplay = [];
   for (let i = 0; i < 3; i++) {
      if (i === 0) {
         levelToDisplay.push(newStr[i]);
      } else if (i === 1) {
         if (newStr[i]) {
            levelToDisplay.push(` ${newStr[i][0]}.`);
         }
      } else if (i === 2) {
         if (newStr[i]) {
            levelToDisplay.push(` ${newStr[i][0]}.`);
         }
      }
   }
   levelToDisplay = levelToDisplay.join('');

   // arreglo para nombre a desplegar red red pendiente cortar a 1er nombre red red

   // fecha a despegar
   let date = moment(createdAt);
   date = date.format('MMM, YYYY');

   const cardHeaderStyles = {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--primary-700)',
      color: 'var(--grey-50)',
      width: '80%',
      marginX: 'auto',
      marginTop: '-50px',
      borderRadius: 'var(--borderRadius)',
      '& .MuiCardHeader-subheader': {
         color: 'var(--grey-100)',
      },
   };
   //sm,  eighthundred, md
   return (
      <Card
         sx={{
            maxWidth: 900,
            width: '100%',
            overflow: 'visible',
            marginTop: '50px',
            backgroundColor: 'var(--primary-50)',
            height: 'min-content',
            mx: { sm: 'auto' }, // xel grid 1 columna en sm
         }}
         onClick={() => openModal(_id)}
      >
         <CardHeader
            title={title}
            subheader={`# ${category}`}
            sx={cardHeaderStyles}
         />

         <CardContent>
            <ContentWrapper>
               <div
                  className="content-center"
                  dangerouslySetInnerHTML={{ __html: desc }}
               ></div>
            </ContentWrapper>
         </CardContent>

         <CardActions disableSpacing>
            <Stack
               direction={{ xs: 'column', sm: 'row' }}
               spacing={2}
               justifyContent="space-between"
               alignItems="center"
               sx={{ m: 2, flexGrow: 1 }}
            >
               <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ m: 2, width: { xs: '100%' } }}
               >
                  <ButtonUser user={blogUser.name} />

                  <ButtonLevel
                     colorLevel={colorLevel}
                     levelToDisplay={levelToDisplay}
                  />
               </Stack>

               <RecipeInfo icon={<FaCalendarAlt />} text={date} />
            </Stack>
         </CardActions>
      </Card>
   );
}

const ContentWrapper = styled.div`
   padding: 2rem;

   .content-center {
      max-height: 700px;
      overflow: hidden;

      p {
         margin-bottom: 0.5rem;
         color: #6e7785;

         img {
            width: 100%;
            height: auto;
         }
      }

      ul {
         list-style-type: disc;
         margin-top: 0;
         padding-top: 0;
         padding-bottom: 0.5rem;
         padding-left: 2rem;
      }
   }
`;
