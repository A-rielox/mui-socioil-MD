import { useAppContext } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import styled from 'styled-components';

import { motion } from 'framer-motion';

const PageBtnContainerBlogs = () => {
   const { numOfBlogPages, pageBlogs, changeBlogsPage } = useAppContext();

   const prevPage = () => {
      let newPage = pageBlogs - 1;

      if (newPage < 1) {
         newPage = numOfBlogPages;
      }
      changeBlogsPage(newPage);
   };

   const nextPage = () => {
      let newPage = pageBlogs + 1;

      if (newPage > numOfBlogPages) {
         newPage = 1;
      }
      changeBlogsPage(newPage);
   };

   const pages = Array.from({ length: numOfBlogPages }, (_, index) => {
      return index + 1;
   });

   return (
      <Wrapper>
         <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.05 }}
            transition={{ duration: 0.15 }}
            className="prev-btn"
            onClick={prevPage}
         >
            <HiChevronDoubleLeft />
            prev
         </motion.button>

         <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.05 }}
            transition={{ duration: 0.15 }}
            className="btn-container"
         >
            {pages.map(pageNumber => {
               return (
                  <button
                     type="button"
                     className={
                        pageNumber === pageBlogs ? 'pageBtn active' : 'pageBtn'
                     }
                     key={pageNumber}
                     onClick={() => changeBlogsPage(pageNumber)}
                  >
                     {pageNumber}
                  </button>
               );
            })}
         </motion.div>

         <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.05 }}
            transition={{ duration: 0.15 }}
            className="next-btn"
            onClick={nextPage}
         >
            sig
            <HiChevronDoubleRight />
         </motion.button>
      </Wrapper>
   );
};

export default PageBtnContainerBlogs;

const Wrapper = styled.section`
   height: 6rem;
   margin-top: 2rem;
   display: flex;
   align-items: center;
   justify-content: end;
   flex-wrap: wrap;
   gap: 1rem;
   .btn-container {
      background: var(--primary-100);
      border-radius: var(--borderRadius);
   }
   .pageBtn {
      background: transparent;
      border-color: transparent;
      width: 50px;
      height: 40px;
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--primary-500);
      transition: var(--transition);
      border-radius: var(--borderRadius);
      cursor: pointer;
   }
   .pageBtn:hover {
      color: var(--white);
      background: var(--primary-500);
   }

   .active {
      background: var(--primary-500);
      color: var(--white);
   }
   .prev-btn,
   .next-btn {
      width: 100px;
      height: 40px;
      background: var(--white);
      border-color: transparent;
      border-radius: var(--borderRadius);
      color: var(--primary-500);
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: var(--transition);
   }
   .prev-btn:hover,
   .next-btn:hover {
      background: var(--primary-500);
      color: var(--white);
   }
`;
