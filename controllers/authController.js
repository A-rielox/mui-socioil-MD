import User from '../models/Users.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

// '/api/v1/auth/register'
const register = async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) {
      throw new BadRequestError('Favor rellenar todos los campos 😒');
   }

   const userAlreadyExist = await User.findOne({ email });
   if (userAlreadyExist) {
      throw new BadRequestError('Este email ya está registrado 🤔');
   } // como sea es Unique en el schema

   const user = await User.create({ name, email, password });

   // en el payload del token { userId: this._id, userRole: this.role }
   const token = user.createJWT();
   user.password = undefined;
   user.__v = undefined;

   res.status(StatusCodes.CREATED).json({
      user,
      token,
      location: user.location,
   });
};

// '/api/v1/auth/login' -- post
const login = async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      throw new BadRequestError('Favor proveer todos los campos 😒');
   }

   const user = await User.findOne({ email }).select('+password');
   if (!user) {
      throw new UnauthenticatedError('Credenciales invalidas 🙀');
   }

   const isPasswordCorrect = await user.comparePassword(password);
   if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Credenciales invalidas 🙀');
   }

   const token = user.createJWT();
   user.password = undefined;
   user.__v = undefined;

   res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

// '/api/v1/auth'
// .route('/updateUser').patch(authenticateUser, updateUser);
const updateUser = async (req, res) => {
   const { email, name, lastName, location } = req.body;

   if (!email || !name || !lastName || !location) {
      throw new BadRequestError('Favor de proveer todos los valores');
   }

   const user = await User.findOne({ _id: req.user.userId });

   // user.email = email;
   // user.name = name;
   // user.lastName = lastName;
   // user.location = location;
   // await user.save();

   const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      req.body,
      {
         new: true,
         runValidators: true,
      }
   );

   const token = updatedUser.createJWT(); // tecnicamente no cambio el id, asi q no necesito cambiar el token

   res.status(StatusCodes.OK).json({
      user: updatedUser,
      token,
      location: updatedUser.location,
   });
};

// '/api/v1/auth'
// ('/getUser').get(authenticateUser, getUser);
const getUser = async (req, res) => {
   if (!req.query.userId) {
      throw new BadRequestError('Favor introducir userId');
   }
   const userId = req.query.userId;

   const user = await User.findById(userId);
   if (!user) {
      throw new NotFoundError(`No encontramos usuario con id: ${userId}`);
   }

   const { _id, name, lastName, role, level, profilePicture } = user;

   const queryUser = { _id, name, lastName, role, level, profilePicture };

   // user:
   // "_id": "622f4542a381cb0d141b2e5a",
   //   "name": "pepi",
   //   "email": "pepi@mail.com",
   //   "lastName": "Mi Apellido",
   //   "location": "Mi Ciudad",
   //   "role": "user",
   //   "level": "ejecutivo",
   //   "profilePicture": "",
   //   "coverPicture": "",
   //   "__v": 0

   res.status(StatusCodes.OK).json({ queryUser });
};

export { register, login, updateUser, getUser };

//
// en el blog q hice, para hacer update ponia, lo de abajo para actualizar todo lo q se pusiera en el req.body, pero me arriesgo a q ponga algo ( de alguna forma ) como si es admin o algo q no debe, DE LA FORMA DE AQUI ARRIBA SOLO ACTUALIZO LAS Q YO PONGO ACÁ 😭😭😭😭😭.
//
//UPDATE POST ⭐⭐⭐ SU FORMA DE HACER LOS UPDATES SON CHINGONAS -- '/api/posts'
// router.put('/:id', async (req, res) => {
//    try {
//       const post = await Post.findById(req.params.id);

//       if (post.username === req.body.username) {
//          try {
//             const updatedPost = await Post.findByIdAndUpdate(
//                req.params.id,
//                { $set: req.body },
//                { new: true }
//             );

//             res.status(200).json(updatedPost);
//          } catch (err) {
//             res.status(500).json(err);
//          }
//       } else {
//          res.status(401).json('You can update only your post!');
//       }
//    } catch (err) {
//       res.status(500).json(err);
//    }
// });
