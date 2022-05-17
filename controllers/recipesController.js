import Recipe from '../models/Recipe.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions, {
   checkAdminPermissions,
} from '../utils/checkPermissions.js';

//'/api/v1/recipes' -- .post(createRecipe)
const createRecipe = async (req, res) => {
   // prettier-ignore
   const {oilsList, problemsList, title, desc} = req.body;
   console.log(req.body);

   if (!title || oilsList.length === 0 || !problemsList || !desc) {
      throw new BadRequestError('Favor proveer todos los valores');
   }

   req.body.createdBy = req.user.userId;

   // OJO q estoy pasando todo el req.body
   const recipe = await Recipe.create(req.body);

   res.status(StatusCodes.CREATED).json({ recipe });
};

//'/api/v1/recipes' -- .route('/:id').delete(deleteRecipe)
const deleteRecipe = async (req, res) => {
   const { id: recipeId } = req.params;

   const recipe = await Recipe.findOne({ _id: recipeId });
   if (!recipe) {
      throw new NotFoundError(`No encontramos receta con id: ${recipeId}`);
   }

   console.log(req.user);
   checkPermissions(req.user, recipe.createdBy);

   await recipe.remove();
   res.status(StatusCodes.OK).json({
      msg: 'Receta eliminada con exito 👏👏👏',
   });
};

// al no poner el await se obtiene solo el query ( en este caso en la variable result ) , al q despues se le puede agregar los sort'ssss y demas filtros, para despues, al poner el await se pase todo lo q se quiera buscar o filtrar.
// cuando se ponga 'all' lo q quiero es q no se filtre en relación a ese, xeso para ese no se va a poner en el queryObject. ( al poner 'all' lo q hace es NO buscar con ese filtro )
//status, type y sort SIEMPRE tienen algo x default, NO pueden estar vacios
// si no fueran a estar presentes podria poner el if de la sig forma:
//if ( status && status !== 'all') {...
// para q se agrege solo si no es undefined
//'/api/v1/recipes' --  .get(getAllRecipes)
// ▦▦▦▦▦▦▦▦ FILTROS ▦▦▦▦▦▦▦▦
const getAllRecipes = async (req, res) => {
   // para buscar es: ?status=pending&jobType=boss
   const { search, oilsList, problemsList, sort /* onHold */ } = req.query;

   // const queryObject = { onHold: onHold };
   const queryObject = {};

   if (oilsList && oilsList !== 'todos') {
      queryObject.oilsList = oilsList;
   }
   // if (problemsList && problemsList !== 'todos') {
   //    queryObject.problemsList = problemsList;
   // }
   if (problemsList && problemsList !== 'todos') {
      queryObject.problemsList = { $regex: problemsList, $options: 'i' };
   }
   // FILTRA EN titulo
   if (search) {
      queryObject.title = { $regex: search, $options: 'i' };
   }

   //SIN AWAIT
   let result = Recipe.find(queryObject);

   // chain sort conditions
   if (sort === 'recientes') {
      result = result.sort('-createdAt');
   }
   if (sort === 'viejos') {
      result = result.sort('createdAt');
   }
   if (sort === 'a-z') {
      result = result.sort('title');
   }
   if (sort === 'z-a') {
      result = result.sort('-title');
   }

   // PAGINACIÓN
   const page = Number(req.query.page) || 1;
   const limit = Number(req.query.limit) || 10;
   const skip = (page - 1) * limit;

   result = result.skip(skip).limit(limit);
   // 75
   // 10 10 10 10 10 10 10 5

   // RESOLVIENDO EL QUERY
   const recipes = await result;

   const totalRecipes = await Recipe.countDocuments(queryObject);
   const numOfPages = Math.ceil(totalRecipes / limit);

   // res.status(StatusCodes.OK).json({
   //    totalRecipes: recipes.length,
   //    numOfPages: 1,
   //    recipes,
   // });
   res.status(StatusCodes.OK).json({
      totalRecipes,
      numOfPages,
      recipes,
   });
};

// route('/getRecipe').get(getSingleRecipe);
const getSingleRecipe = async (req, res) => {
   if (!req.query.recipeId) {
      throw new BadRequestError('Favor introducir recipeId');
   }
   const recipeId = req.query.recipeId;

   const recipe = await Recipe.findById(recipeId);
   if (!recipe) {
      throw new NotFoundError(
         `🤦 No encontramos una receta con id: ${recipeId}`
      );
   }

   const { updatedAt, __v, ...queryRecipe } = recipe._doc;

   res.status(StatusCodes.OK).json({ queryRecipe });
};

//'/api/v1/recipes' -- .route('/:id').patch(updateRecipe)
const updateRecipe = async (req, res) => {
   const { id: recipeId } = req.params;
   const { oilsList, problemsList, title, desc } = req.body;

   if (!title || oilsList.length === 0 || problemsList.length === 0 || !desc) {
      throw new BadRequestError('Favor proveer todos los valores');
   }

   const recipe = await Recipe.findOne({ _id: recipeId });
   if (!recipe) {
      throw new NotFoundError(`No encontramos receta con id: ${recipeId}`);
   }

   // tambien permite admin
   checkPermissions(req.user, recipe.createdBy);

   // tecnicamente NO lo necesito en el front como respuesta, el updatedJob
   // OJO q le paso todo el req.body
   const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: recipeId },
      req.body,
      {
         new: true,
         runValidators: true,
      }
   );

   res.status(StatusCodes.OK).json({ updatedRecipe });
};

const updateAdminRecipe = async (req, res) => {
   const { id: recipeId } = req.params;
   const { onHold } = req.body;

   // console.log(req.body);
   // console.log(typeof onHold);

   if (typeof onHold !== 'boolean') {
      throw new BadRequestError('Favor proveer todos los valores 🥊');
   }

   const recipe = await Recipe.findOne({ _id: recipeId });
   if (!recipe) {
      throw new NotFoundError(`No encontramos receta con id: ${recipeId}`);
   }

   // permite solo admin
   checkAdminPermissions(req.user, recipe.createdBy);

   // tecnicamente NO lo necesito en el front como respuesta
   // OJO q le paso todo el req.body
   const updatedAdminRecipe = await Recipe.findOneAndUpdate(
      { _id: recipeId },
      req.body,
      {
         new: true,
         runValidators: true,
      }
   );

   res.status(StatusCodes.OK).json({ updatedAdminRecipe });
};

//'/api/v1/recipes' -- route('/stats').get(showStats);
const showStats = async (req, res) => {
   res.send('<h1> show stats</h1>');
};

export {
   createRecipe,
   deleteRecipe,
   getAllRecipes,
   updateRecipe,
   showStats,
   updateAdminRecipe,
   getSingleRecipe,
};
