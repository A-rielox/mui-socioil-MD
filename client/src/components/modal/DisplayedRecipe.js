import { useEffect, useState, useRef } from 'react';
import Loading from '../Loading';

import { FaCalendarAlt } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { BsFillDropletFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import moment from 'moment';
import RecipeInfo from '../RecipeInfo';
import styled from 'styled-components';
import { BsArrowRightSquareFill } from 'react-icons/bs';

import { motion } from 'framer-motion';
import Backdrop from './Backdrop';

const dropIn = {
   hidden: {
      y: '-100vh',
      opacity: 0,
   },
   visible: {
      y: 0,
      opacity: 1,
      transition: {
         duration: 0.2,
         type: 'spring',
         damping: 25,
         stiffness: 500,
      },
   },
   exit: { x: '-100vw', opacity: 0 },
};

// const adminInitialState = {
//    onHold: false,
// };

const DisplayedRecipe = ({
   _id,
   oilsList,
   problemsList,
   title,
   desc,
   createdAt,
   createdBy,
   // openModal,
   handleClose,
   onHold, // <---------- COMENTAR
}) => {
   const { setEditRecipe, deleteRecipe, user, authFetch } = useAppContext();
   const [recipeUser, setRecipeUser] = useState(null);

   // pal checkbox
   const [adminValues, setAdminValues] = useState({ onHold });

   // FETCH PARA OBTENER VALORES DE NOMBRE Y RANGO DEL user + receta
   useEffect(() => {
      // lightblue obtener  NOMBRE Y RANGO DEL user
      const fetchUser = async () => {
         const {
            data: { queryUser },
         } = await authFetch.get(`/auth/getUser?userId=${createdBy}`);

         setRecipeUser(queryUser);
      };

      // lightblue obtener datos RECIPE
      const fetchRecipe = async () => {
         const {
            data: { queryRecipe },
         } = await authFetch.get(`/recipes/getRecipe?recipeId=${_id}`);

         setAdminValues({
            onHold: queryRecipe.onHold,
         });
      };

      fetchUser();
      fetchRecipe();
   }, [_id]);

   // green ACTUALIZA VALORES ADMIN
   const switchAdminValues = e => {
      // PONER DEBAJO DEL USEEFFECT PA CARGAR VALORES
      const name = e.target.name;
      const checked = e.target.checked;

      setAdminValues({ ...adminValues, [name]: checked });
   };
   // green ENVIA  VALORES ADMIN A DB
   const timerRef = useRef(null); // para 👍
   const submitAdminValues = e => {
      clearTimeout(timerRef.current);

      // actualizando
      const updateAdminValues = async () => {
         await authFetch.patch(`/recipes/admin/${_id}`, {
            onHold: adminValues.onHold,
         });

         // NO NECESITO ACTUALIZAR LOS DATOS CON LA RESPUESTA XQ MI ESTADO DE LOS CHECKBOX YA REPRESENTA EL VALOR DE LA DB
      };

      updateAdminValues();
      // fin actualizando

      // para boton con 👍
      const guardarBtn = e.target;
      guardarBtn.firstElementChild.classList.toggle('ready');

      timerRef.current = setTimeout(() => {
         guardarBtn.firstElementChild.classList.toggle('ready');
      }, 3000);
   };

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

   // arreglo para nombre a desplegar red red pendiente cortar a 1er nombre red red

   // fecha a despegar
   let date = moment(createdAt);
   date = date.format('MMM, YYYY');

   return (
      <Backdrop onClick={handleClose}>
         <motion.div
            onClick={e => e.stopPropagation()}
            // className="modal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
         >
            <Wrapper /* onClick={() => openModal(_id)} */>
               <header>
                  <div className="info">
                     <h5>{title}</h5>

                     <ul className="ulListProblem">
                        {problemsList.map((problem, index) => {
                           return (
                              <li key={index}>
                                 <ImCross className="icon" />
                                 {problem}
                              </li>
                           );
                        })}
                     </ul>
                  </div>
               </header>

               <div className="content">
                  <div className="content-center">
                     <ul className="ulListOil">
                        {oilsList.map((oil, index) => {
                           return (
                              <li key={index}>
                                 <BsFillDropletFill className="icon" />
                                 {oil}
                              </li>
                           );
                        })}
                     </ul>
                     <p>{desc}</p>
                  </div>

                  <footer>
                     <div className="footer-user">
                        <div className="actions">
                           {user._id === createdBy || user.role === 'admin' ? (
                              <Link
                                 to="/add-recipe"
                                 onClick={() => {
                                    setEditRecipe(_id);
                                    handleClose();
                                 }}
                                 className="btn edit-btn"
                              >
                                 editar
                              </Link>
                           ) : (
                              <button type="button" className={`btn btn-user`}>
                                 {recipeUser.name}
                              </button>
                           )}
                           {user._id === createdBy || user.role === 'admin' ? (
                              <button
                                 type="button"
                                 className="btn delete-btn"
                                 onClick={() => {
                                    handleClose();
                                    deleteRecipe(_id);
                                 }}
                              >
                                 borrar
                              </button>
                           ) : (
                              <button
                                 type="button"
                                 className={`btn status ${colorLevel}`}
                              >
                                 {levelToDisplay}
                              </button>
                           )}
                        </div>

                        <RecipeInfo icon={<FaCalendarAlt />} text={date} />
                     </div>

                     {user.role === 'admin' && (
                        <div className="footer-admin-wrapper">
                           <div className="footer-admin">
                              <div className="checkboxcito">
                                 <input
                                    type="checkbox"
                                    id="box-1"
                                    checked={adminValues.onHold}
                                    name="onHold"
                                    onChange={e => {
                                       switchAdminValues(e);
                                    }}
                                 />
                                 <label htmlFor="box-1">En revisión</label>
                              </div>
                           </div>

                           <button
                              type="button"
                              className={`btn btn-edit`}
                              onClick={e => submitAdminValues(e)}
                           >
                              Guardar
                              <span className="edit-success">👍</span>
                              <BsArrowRightSquareFill />
                           </button>
                        </div>
                     )}
                  </footer>
               </div>

               <button
                  type="button"
                  className={`btn btn-close`}
                  onClick={handleClose}
               >
                  <ImCross />
               </button>
            </Wrapper>
         </motion.div>
      </Backdrop>
   );
};

export default DisplayedRecipe;

const Wrapper = styled.article`
   background: var(--white);
   border-radius: var(--borderRadius);
   display: grid;
   /* grid-template-rows: 100px auto; */
   grid-template-rows: min-content auto;

   box-shadow: var(--shadow-2);

   position: relative; // pal btn close

   max-height: 90vh;
   max-width: 90vw;
   overflow-y: scroll;

   header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--grey-100);
      display: grid;
      align-items: center;
      /* height: 100px; */
      height: min-content;

      h5 {
         letter-spacing: 0;
      }
   }

   .info {
      h5 {
         margin-bottom: 0.25rem;
      }
   }
   .ulListProblem {
      margin: 0 20px;
      display: flex;
      justify-content: space-between;
      text-transform: capitalize;

      li {
         list-style-type: none;
         margin-top: 0.5rem;
         display: flex;
         align-items: center;
      }

      .icon {
         font-size: 0.7rem;
         margin-right: 0.5rem;
         color: var(--red-dark);
      }
   }
   .ulListOil {
      margin: 0 20px;
      /* display: flex;
      justify-content: space-between; */
      text-transform: capitalize;

      li {
         list-style-type: none;
         margin-top: 0.5rem;
         display: flex;
         align-items: center;
      }

      .icon {
         font-size: 0.7rem;
         margin-right: 0.5rem;
         color: #dfb33b;
      }
   }

   /* 
   distribuidor silver
   star		#b500ff
   senior star	#c900c9
   executive	#d70000
   silver		#a10000
   gold		#f3ff00
   platinum	#00f900
   diamond		#058210
   crown diamond	#3f15d0
   r.c. diamond	#6500a3
   */

   .distribuidor {
      background: rgba(191, 191, 191, 0.3);
      color: var(--textColor);
   }

   .estrella {
      background: rgba(181, 0, 255, 0.3);
      color: var(--textColor);
   }
   .mayor {
      background: rgba(201, 0, 201, 0.3);
      color: var(--textColor);
   }
   .ejecutivo {
      color: var(--textColor);
      background: rgba(215, 0, 0, 0.3);
   }
   .plata {
      color: var(--textColor);
      background: rgba(161, 0, 0, 0.3);
   }
   .oro {
      color: var(--textColor);
      background: rgba(243, 255, 0, 0.3);
   }
   .platino {
      color: var(--textColor);
      background: rgba(0, 249, 0, 0.3);
   }
   .diamante {
      color: var(--textColor);
      background: rgba(5, 130, 16, 0.3);
   }
   .corona {
      color: var(--textColor);
      background: rgba(63, 21, 208, 0.3);
   }
   .real {
      color: var(--textColor);
      background: rgba(101, 0, 163, 0.3);
   }

   .content {
      padding: 1rem 1.5rem;
      display: grid;
      grid-template-rows: 1fr auto;
   }
   .content-center {
      display: grid;
      align-content: start;
      grid-template-columns: 1fr;
      row-gap: 0.5rem;
      border-bottom: 1px solid var(--grey-100);
      @media (min-width: 576px) {
         grid-template-columns: 1fr 1fr;
      }
      @media (min-width: 992px) {
         grid-template-columns: 1fr;

         .btn:first-child {
            margin-bottom: 10px;
         }
      }
      @media (min-width: 1120px) {
         grid-template-columns: 1fr 1fr;
      }
   }

   .status {
      border-radius: var(--borderRadius);
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
      text-align: center;
      width: auto;
      height: 30px;
      font-size: 0.8rem;

      margin-left: 0.5rem;
   }

   .actions {
      .btn-user {
         font-size: 0.8rem;
         /* margin-left: 0.5rem; */
         font-weight: bold;
      }
   }

   footer {
      margin-top: 1rem;
      display: flex;

      flex-direction: column;
   }

   .footer-user {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 576px) {
         display: flex;
         flex-direction: column;
         gap: 10px;
         width: 100%;
         .actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;

            .status {
               margin-left: 0;
            }
         }
      }
   }
   .footer-admin-wrapper {
      display: flex;
      flex-direction: column;
   }
   .footer-admin {
      margin-top: 1rem;
      border-top: 1px solid var(--grey-100);
      padding-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
   }

   .edit-btn,
   .delete-btn {
      letter-spacing: var(--letterSpacing);
      cursor: pointer;
      height: 30px;
      font-size: 0.8rem;
   }
   .edit-btn {
      color: var(--green-dark);
      background: var(--green-light);
      margin-right: 0.5rem;

      @media (max-width: 576px) {
         width: 100%;
         text-align: center;
      }
   }
   .delete-btn {
      color: var(--red-dark);
      background: var(--red-light);
   }
   &:hover .actions {
      visibility: visible;
   }

   @media (min-width: 576px) {
      padding: 0.5rem;
      max-width: 80vw;
   }
   @media (min-width: 992px) {
      padding: 1rem;
      max-width: 70vw;
   }
   @media (min-width: 1120px) {
      padding: 1.5rem;
      max-width: 800px;
   }

   .btn-close {
      position: absolute;
      top: 20px;
      right: 20px;

      background-color: var(--red-light);

      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;

      &:hover {
         background-color: var(--white);
         color: var(--red-light);
         border: 3px solid var(--red-light);
      }
   }

   .btn-edit {
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

   /* CHECKBOX */

   input[type='checkbox'] {
      display: none;
   }

   input[type='checkbox'] + label {
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 20px;
      font: 14px/20px 'Open Sans', Arial, sans-serif;
      color: var(--textColor);
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
   }

   input[type='checkbox'] + label:last-child {
      margin-bottom: 0;
   }

   input[type='checkbox'] + label:before {
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      border: 3px solid var(--primary-500);
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.6;
      -webkit-transition: all 0.12s, border-color 0.08s;
      transition: all 0.12s, border-color 0.08s;
   }

   input[type='checkbox']:checked + label:before {
      width: 10px;
      top: -5px;
      left: 5px;
      border-radius: 0;
      opacity: 1;
      border-top-color: transparent;
      border-left-color: transparent;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
   }
`;
