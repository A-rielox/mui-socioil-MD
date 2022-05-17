import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Loading from '../common/Loading';
import { useAppContext } from '../../context/appContext';
import moment from 'moment';
import { Link } from 'react-router-dom';

import headerTitle from './headerTitle';
import headerSubtitle from './headerSubtitle';
import PrevParagraph from './PrevParagraph';

import {
   ButtonUser,
   ButtonLevel,
   ButtonEdit,
   ButtonDelete,
} from '../buttons/ButtonsUser';

const ExpandMore = styled(props => {
   const { expand, ...other } = props;
   return <IconButton {...other} />;
})(({ theme, expand }) => ({
   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
   marginLeft: 'auto',
   transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
   }),
}));

export default function RecipeReviewCard({
   _id,
   oilsList,
   problemsList,
   title,
   desc,
   createdAt,
   createdBy,
   // openModal,
   onHold,
}) {
   const { user, authFetch, setEditRecipe, deleteRecipe } = useAppContext();
   const [recipeUser, setRecipeUser] = useState(null);
   useEffect(() => {
      const fetchUser = async () => {
         const {
            data: { queryUser },
         } = await authFetch.get(`/auth/getUser?userId=${createdBy}`);

         setRecipeUser(queryUser);
      };

      fetchUser();

      return () => {
         setRecipeUser(null);
         // ARREGLA
         // Warning: Can't perform a React state update on an unmounted component.
      };
   }, [_id]);

   //
   // SEPARO LA DESCRIPCION EN PARRAFOS XCADA ENTER
   let newDesc = desc.split('\n');
   newDesc = newDesc.map(singleString => singleString.trim());

   const [expanded, setExpanded] = useState(false);

   const handleExpandClick = () => {
      setExpanded(!expanded);
   };

   // fecha a despegar
   let date = moment(createdAt);
   date = date.format('MMM, YYYY');

   if (!recipeUser) {
      return <Loading center />;
   }

   // arreglo para class del color del nivel
   let colorLevel = recipeUser.level.split(' ');
   colorLevel = colorLevel[colorLevel.length - 1];

   // arreglo del string del nivel
   const newStr = recipeUser.level.split(' ');
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

   return (
      <Card
         sx={{
            maxWidth: 600,
            overflow: 'visible',
            marginTop: '50px',
            backgroundColor: 'var(--primary-50)',
            height: 'min-content',
            mx: { sm: 'auto' }, // xel grid 1 columna en sm
         }}
      >
         <CardHeader
            title={headerTitle({ oilsList, title })}
            subheader={headerSubtitle(problemsList)}
            sx={cardHeaderStyles}
         />

         <CardContent>
            <PrevParagraph desc={desc} />
         </CardContent>

         <CardActions disableSpacing>
            <Stack
               direction={{ xs: 'column', sm: 'row' }}
               spacing={2}
               justifyContent="flex-start"
               alignItems="flex-end"
               sx={{ mt: 2, flexGrow: 1 }}
            >
               <ButtonUser user={recipeUser.name} />

               <ButtonLevel
                  colorLevel={colorLevel}
                  levelToDisplay={levelToDisplay}
               />
            </Stack>

            <ExpandMore
               expand={expanded}
               onClick={handleExpandClick}
               aria-expanded={expanded}
               aria-label="show more"
            >
               <ExpandMoreIcon />
            </ExpandMore>
         </CardActions>

         <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
               {newDesc.map((singleDesc, index) => {
                  return (
                     <Typography key={index} paragraph variant="body1">
                        {singleDesc}
                     </Typography>
                  );
               })}

               {(user._id === createdBy || user.role === 'admin') && (
                  <Stack
                     direction="row"
                     spacing={2}
                     justifyContent={{ xs: 'center', sm: 'center' }}
                     alignItems="flex-end"
                     sx={{ mt: 2, flexGrow: 1 }}
                  >
                     <Box sx={{ width: { xs: '50%', sm: 'min-content' } }}>
                        <Link
                           to="/add-recipe"
                           onClick={() => {
                              setEditRecipe(_id);
                           }}
                        >
                           <ButtonEdit />
                        </Link>
                     </Box>

                     <ButtonDelete deleteRecipe={deleteRecipe} id={_id} />
                  </Stack>
               )}
            </CardContent>
         </Collapse>
      </Card>
   );
}
