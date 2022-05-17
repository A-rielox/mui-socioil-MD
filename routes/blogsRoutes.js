import express from 'express';
const router = express.Router();

import {
   createBlog,
   deleteBlog,
   getAllBlogs,
   updateBlog,
   showStats,
   updateAdminBlog,
   getSingleBlog,
} from '../controllers/blogsController.js';

//'/api/v1/blogs'
router.route('/').post(createBlog).get(getAllBlogs);
router.route('/getBlog').get(getSingleBlog);

router.route('/stats').get(showStats);

router.route('/admin/:id').patch(updateAdminBlog);
router.route('/:id').delete(deleteBlog).patch(updateBlog);

export default router;
