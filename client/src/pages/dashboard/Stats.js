import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/appContext';
import Loading from '../../components/common/Loading';
import PageBtnContainerBlogs from '../../components/PageBtnContainerBlogs';
import styled from 'styled-components';

import New from '../../components/news/News';
import NewsModal from '../../components/news/NewsModal';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Stats = () => {
   const {
      getBlogs,
      blogs,
      isLoading,
      pageBlogs,
      totalBlogs,

      searchBlog,
      searchCategory,
      sort,
      numOfBlogPages,
   } = useAppContext();

   const [modalOpen, setModalOpen] = useState(false);
   const [blogOpened, setBlogOpened] = useState('');
   const close = () => setModalOpen(false);
   const open = blogId => {
      setModalOpen(true);

      const blogSelected = blogs.filter(blog => blog._id === blogId);

      setBlogOpened(blogSelected[0]);
   };

   useEffect(() => {
      getBlogs({ news: true });
   }, [searchBlog, searchCategory, sort, pageBlogs, blogs.length]);

   if (isLoading) {
      return <Loading center />;
   }

   if (blogs.length === 0) {
      return <NoEncontramos>No tenemos noticias 📰 ...</NoEncontramos>;
   }

   const containerStyles = {
      my: 2,
      '& .backdrop': {
         position: 'fixed',
         top: 0,
         bottom: 0,
         left: 0,
         right: 0,
         height: '100vh',
         width: '100%',
         background: '#0000008a',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         zIndex: '100',
      },
   };

   return (
      <Container sx={containerStyles} maxWidth="lg">
         <h5>
            tenemos {totalBlogs} noticia{blogs.length > 1 && 's'}
         </h5>

         <Box
            sx={{
               display: 'grid',
               gridTemplateColumns: {
                  sm: '1fr',
               },
               gap: 4,
            }}
         >
            {blogs.map(blog => {
               return <New key={blog._id} {...blog} openModal={open} />;
            })}
         </Box>

         {numOfBlogPages > 1 && <PageBtnContainerBlogs />}

         {modalOpen && blogOpened && (
            <>
               <NewsModal
                  {...blogOpened}
                  modalOpen={modalOpen}
                  handleClose={close}
               />
            </>
         )}
      </Container>
   );
};

export default Stats;

const NoEncontramos = styled.h2`
   text-align: center;
   margin-top: 4rem;
   text-transform: none;
`;
