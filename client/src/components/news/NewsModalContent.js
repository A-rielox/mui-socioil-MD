import { useEffect, useState, useRef } from 'react';
import Loading from '../common/Loading';

import { FaCalendarAlt } from 'react-icons/fa';
// import { ImCross } from 'react-icons/im';
import { BsArrowRightSquareFill } from 'react-icons/bs';

import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import moment from 'moment';
import RecipeInfo from '../common/RecipeInfo';
import styled from 'styled-components';

const NewsModalContent = ({
   _id,
   title,
   desc,
   category,
   createdAt,
   createdBy,
   handleClose,
   // valores para admin,
   // onHold,
   // news,
   // featured,
   //
}) => {
   const { setEditBlog, deleteBlog, user, authFetch } = useAppContext();
   const [blogUser, setBlogUser] = useState(null);
   // pal checkbox
   const [adminValues, setAdminValues] = useState({
      onHold: false,
      news: false,
      featured: false,
   });

   // FETCH PARA OBTENER VALORES DE NOMBRE Y RANGO DEL user + blog
   useEffect(() => {
      // lightblue obtener NOMBRE Y RANGO DEL user
      const fetchUser = async () => {
         const {
            data: { queryUser },
         } = await authFetch.get(`/auth/getUser?userId=${createdBy}`);

         setBlogUser(queryUser);
      };

      // lightblue obtener datos BLOG
      const fetchBlog = async () => {
         const {
            data: { queryBlog },
         } = await authFetch.get(`/blogs/getBlog?blogId=${_id}`);

         setAdminValues({
            onHold: queryBlog.onHold,
            news: queryBlog.news,
            featured: queryBlog.featured,
         });
      };

      fetchUser();
      fetchBlog();
   }, [_id]);

   // green ACTUALIZA VALORES ADMIN
   const switchAdminValues = e => {
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
         await authFetch.patch(`/blogs/admin/${_id}`, {
            onHold: adminValues.onHold,
            news: adminValues.news,
            featured: adminValues.featured,
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

   if (!blogUser) {
      return <Loading center />;
   }

   // arreglo para nombre a desplegar red red pendiente cortar a 1er nombre red red

   // fecha a despegar
   let date = moment(createdAt);
   date = date.format('MMM, YYYY');

   return (
      <Wrapper>
         <header>
            <div className="info">
               <h5>{title}</h5>
            </div>
         </header>

         <div className="content">
            <div
               className="content-center"
               dangerouslySetInnerHTML={{ __html: desc }}
            ></div>

            <footer>
               <div className="footer-user">
                  <div className="actions">
                     {user._id === createdBy ||
                        (user.role === 'admin' && (
                           <Link
                              to="/add-blog"
                              onClick={() => {
                                 handleClose();
                                 setEditBlog(_id);
                              }}
                              className="btn edit-btn"
                           >
                              editar
                           </Link>
                        ))}
                     {user._id === createdBy ||
                        (user.role === 'admin' && (
                           <button
                              type="button"
                              className="btn delete-btn"
                              onClick={() => {
                                 handleClose();
                                 deleteBlog(_id);
                              }}
                           >
                              borrar
                           </button>
                        ))}
                  </div>

                  <RecipeInfo icon={<FaCalendarAlt />} text={date} />
               </div>

               {user.role === 'admin' && (
                  <div className="footer-admin-wrapper">
                     <div className="footer-admin">
                        <div className="checkboxcito">
                           <input
                              type="checkbox"
                              id="box-onHold"
                              checked={adminValues.onHold}
                              name="onHold"
                              onChange={e => {
                                 switchAdminValues(e);
                              }}
                           />
                           <label htmlFor="box-onHold">En revisión</label>
                        </div>

                        <div className="checkboxcito">
                           <input
                              type="checkbox"
                              id="box-news"
                              checked={adminValues.news}
                              name="news"
                              onChange={e => {
                                 switchAdminValues(e);
                              }}
                           />
                           <label htmlFor="box-news">Noticia</label>
                        </div>

                        <div className="checkboxcito">
                           <input
                              type="checkbox"
                              id="box-featured"
                              checked={adminValues.featured}
                              name="featured"
                              onChange={e => {
                                 switchAdminValues(e);
                              }}
                           />
                           <label htmlFor="box-featured">Destacado</label>
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
      </Wrapper>
   );
};

export default NewsModalContent;

const Wrapper = styled.article`
   /* background: var(--white); */
   /* border-radius: var(--borderRadius); */
   /* display: grid; */
   /* grid-template-rows: 100px auto; */
   /* box-shadow: var(--shadow-2); */

   position: relative; // pal btn close
   max-height: 90vh;
   overflow-y: scroll;

   .content {
      padding: 1rem 1.5rem;
      display: grid;
      grid-template-rows: 1fr auto;
   }
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

   @media (min-width: 700px) {
      padding: 1rem;
      /* max-width: 80vw; */
   }

   @media (min-width: 992px) {
      padding: 2rem;
      /* max-width: 70vw; */
   }
   @media (min-width: 1120px) {
      padding: 1.5rem;
      /* max-width: 800px; */
   }

   header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--grey-100);
      display: grid;
      align-items: center;
      height: 100px;
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
      justify-content: space-between;

      @media (max-width: 450px) {
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;

         .checkboxcito {
            width: 120px;
            margin-top: 1rem;
         }
      }
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
   }
   .delete-btn {
      color: var(--red-dark);
      background: var(--red-light);
   }
   &:hover .actions {
      visibility: visible;
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
