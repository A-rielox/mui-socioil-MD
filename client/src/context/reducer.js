import { initialState } from './appContext';
// prettier-ignore
import {
   DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES, CREATE_RECIPE_BEGIN, CREATE_RECIPE_SUCCESS, CREATE_RECIPE_ERROR, GET_RECIPES_BEGIN, GET_RECIPES_SUCCESS, SET_EDIT_RECIPE, DELETE_RECIPE_BEGIN, EDIT_RECIPE_BEGIN, EDIT_RECIPE_SUCCESS, EDIT_RECIPE_ERROR, CLEAR_FILTERS, CHANGE_PAGE,
   // ===== BLOG
   CREATE_BLOG_BEGIN, CREATE_BLOG_SUCCESS, CREATE_BLOG_ERROR, GET_BLOGS_BEGIN, GET_BLOGS_SUCCESS, DELETE_BLOG_BEGIN, SET_EDIT_BLOG, EDIT_BLOG_BEGIN, EDIT_BLOG_SUCCESS, EDIT_BLOG_ERROR, CHANGE_BLOGS_PAGE,
} from './actions';

const reducer = (state, action) => {
   if (action.type === DISPLAY_ALERT) {
      return {
         ...state,
         showAlert: true,
         alertText: 'Favor introducir todos los valores 🤦',
         alertType: 'danger',
      };
   }
   if (action.type === CLEAR_ALERT) {
      return {
         ...state,
         showAlert: false,
         alertText: '',
         alertType: '',
      };
   }

   //
   if (action.type === REGISTER_USER_BEGIN) {
      return {
         ...state,
         isLoading: true,
      };
   }
   if (action.type === REGISTER_USER_SUCCESS) {
      const { user, token, location } = action.payload;
      return {
         ...state,
         isLoading: false,
         user,
         token,
         userLocation: location,
         jobLocation: location,
         showAlert: true,
         alertType: 'success',
         alertText: 'Usuario creado 👍 ...',
      };
   }
   if (action.type === REGISTER_USER_ERROR) {
      const { msg } = action.payload;
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertText: msg,
         alertType: 'danger',
      };
   }

   //
   if (action.type === LOGIN_USER_BEGIN) {
      return {
         ...state,
         isLoading: true,
      };
   }
   if (action.type === LOGIN_USER_SUCCESS) {
      const { user, token, location } = action.payload;
      return {
         ...state,
         isLoading: false,
         user,
         token,
         userLocation: location,
         jobLocation: location,
         showAlert: true,
         alertType: 'success',
         alertText: 'Usuario ingresado 👍 ...',
      };
   }
   if (action.type === LOGIN_USER_ERROR) {
      const { msg } = action.payload;
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertText: msg,
         alertType: 'danger',
      };
   }

   //
   if (action.type === TOGGLE_SIDEBAR) {
      return {
         ...state,
         showSidebar: action.payload.value,
      };
   }

   //
   if (action.type === LOGOUT_USER) {
      return {
         ...initialState,
         user: null,
         token: null,
         userLocation: '',
         jobLocation: '',
      };
   }

   //
   if (action.type === UPDATE_USER_BEGIN) {
      return { ...state, isLoading: true };
   }
   if (action.type === UPDATE_USER_SUCCESS) {
      const { user, token, location } = action.payload;

      return {
         ...state,
         isLoading: false,
         user,
         token,
         userLocation: location,
         jobLocation: location,
         showAlert: true,
         alertType: 'success',
         alertText: 'Usuario actualizado 👍',
      };
   }
   if (action.type === UPDATE_USER_ERROR) {
      const { msg } = action.payload;

      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertText: msg,
         alertType: 'danger',
      };
   }

   //
   if (action.type === HANDLE_CHANGE) {
      const { name, value } = action.payload;

      // poner page
      return {
         ...state,
         [name]: value,
         page: 1,
      };
   }

   //
   if (action.type === CLEAR_VALUES) {
      const initialState = {
         isEditing: false,
         editRecipeId: '',
         title: '',
         desc: '',
         oilsList: [],
         problemsList: [],
         molestias: '',
         // oil1: '',
         // oil2: '',
         // oil3: '',
         // oil4: '',
         // oil5: '',
         // problem1: '',
         // problem2: '',
         // problem3: '',
         // ========= BLOG
         isEditingBlog: false,
         editBlogId: '',
         titleBlog: '',
         descBlog: '',
         category: 'general',
      };

      return { ...state, ...initialState };
   }

   //
   if (action.type === CREATE_RECIPE_BEGIN) {
      return { ...state, isLoading: true };
   }
   if (action.type === CREATE_RECIPE_SUCCESS) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'success',
         alertText: 'Recetita creada!',
      };
   }
   if (action.type === CREATE_RECIPE_ERROR) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'danger',
         alertText: action.payload.msg,
      };
   }

   //
   if (action.type === GET_RECIPES_BEGIN) {
      return { ...state, isLoading: true, showAlert: false };
   }
   if (action.type === GET_RECIPES_SUCCESS) {
      const { totalRecipes, numOfPages, recipes } = action.payload;

      // red red quitar list4Problems red red
      // let tempRecipes = [...recipes];
      // let list4Problems = tempRecipes.map(recipe => recipe.problemsList);
      // list4Problems = [...new Set(list4Problems.flat())];

      return {
         ...state,
         isLoading: false,
         recipes,
         totalRecipes,
         numOfPages,
         // list4Problems,
      };
   }

   //
   if (action.type === SET_EDIT_RECIPE) {
      const recipe = state.recipes.find(
         recipe => recipe._id === action.payload.id
      );

      // prettier-ignore
      const {
         _id,title,desc,oilsList,/* oil1,oil2,oil3,oil4,oil5, */problemsList,/* problem1,problem2,problem3, */
      } = recipe;

      const editingMolestias = problemsList.join(', ');

      // prettier-ignore
      return { ...state, isEditing: true, editRecipeId: _id, title, desc, oilsList,  /* oil1, oil2, oil3, oil4, oil5, */ problemsList, /* problem1, problem2, problem3, */ molestias: editingMolestias };
   }
   //
   if (action.type === DELETE_RECIPE_BEGIN) {
      // en la fcn llamo a getRecipes() q va a poner isLoading:false
      return { ...state, isLoading: true, page: 1 };
   }

   //
   if (action.type === EDIT_RECIPE_BEGIN) {
      return { ...state, isLoading: true };
   }
   if (action.type === EDIT_RECIPE_SUCCESS) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'success',
         alertText: 'Recetita editada 🐱!',
      };
   }
   if (action.type === EDIT_RECIPE_ERROR) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'danger',
         alertText: action.payload.msg,
      };
   }

   //
   if (action.type === CLEAR_FILTERS) {
      return {
         ...state,
         search: '',
         searchOil: 'todos',
         searchProblem: 'todos',
         sort: 'recientes',
         //===== BLOG
         searchBlog: '',
         searchCategory: 'todas',
      };
   }

   //
   if (action.type === CHANGE_PAGE) {
      return { ...state, page: action.payload.page };
   }

   // ========================================
   // ================= BLOG =================
   // ========================================
   if (action.type === CREATE_BLOG_BEGIN) {
      return { ...state, isLoading: true };
   }
   if (action.type === CREATE_BLOG_SUCCESS) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'success',
         alertText: 'Blog creado 💪!',
      };
   }
   if (action.type === CREATE_BLOG_ERROR) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'danger',
         alertText: action.payload.msg,
      };
   }

   //
   if (action.type === GET_BLOGS_BEGIN) {
      return { ...state, isLoading: true, showAlert: false };
   }
   if (action.type === GET_BLOGS_SUCCESS) {
      const { totalBlogs, numOfBlogPages, blogs } = action.payload;

      return {
         ...state,
         isLoading: false,
         blogs,
         totalBlogs,
         numOfBlogPages,
      };
   }

   //
   if (action.type === DELETE_BLOG_BEGIN) {
      // en la fcn llamo a getRecipes() q va a poner isLoading:false
      return { ...state, isLoading: true, pageBlogs: 1 };
   }

   //
   if (action.type === SET_EDIT_BLOG) {
      const blog = state.blogs.find(blog => blog._id === action.payload.id);

      // prettier-ignore
      const { _id, category, desc, title } = blog;

      // prettier-ignore
      return { ...state, isEditingBlog: true, editBlogId: _id, titleBlog: title, descBlog: desc, category  };
   }

   //
   if (action.type === EDIT_BLOG_BEGIN) {
      return { ...state, isLoading: true };
   }
   if (action.type === EDIT_BLOG_SUCCESS) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'success',
         alertText: 'Blog editado 🐱!',
      };
   }
   if (action.type === EDIT_BLOG_ERROR) {
      return {
         ...state,
         isLoading: false,
         showAlert: true,
         alertType: 'danger',
         alertText: action.payload.msg,
      };
   }

   //
   if (action.type === CHANGE_BLOGS_PAGE) {
      return { ...state, pageBlogs: action.payload.pageBlogs };
   }

   throw new Error(`no such action :${action.type}`);
};
export default reducer;
