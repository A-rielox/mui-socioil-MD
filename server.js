import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import connectDB from './db/connect.js';
import morgan from 'morgan';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

//===== ROUTERS
import authRouter from './routes/authRoutes.js';
import recipesRouter from './routes/recipesRoutes.js';
import blogsRouter from './routes/blogsRoutes.js';

const app = express();
dotenv.config();

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
// import xss from 'xss-clean'; // red red red PRUEBA P BLOG
import mongoSanitize from 'express-mongo-sanitize';

// ▦▦▦▦▦▦▦▦▦▦ MIDDLEWARE ▦▦▦▦▦▦▦▦▦▦
// se va a cambiar a production en heroku
if (process.env.NODE_ENV !== 'production') {
   app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(express.json()); // acceso a json de req.body

// app.use(helmet());
app.use(
   helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
         'img-src': ["'self'", 'https: data:'],
      },
   })
); // red red red PRUEBA P BLOG
// app.use(xss()); // red red red PRUEBA P BLOG
app.use(mongoSanitize());

//===== ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/recipes', authenticateUser, recipesRouter);
app.use('/api/v1/blogs', authenticateUser, blogsRouter);

app.get('*', function (request, response) {
   response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// ▦▦▦▦▦▦▦▦▦▦ APP LISTEN ▦▦▦▦▦▦▦▦▦▦
const port = process.env.PORT || 5000;

const start = async () => {
   try {
      await connectDB(process.env.MONGO_URL);

      app.listen(port, () =>
         console.log(`Server es listening in port: ${port}.....🐸`)
      );
   } catch (error) {
      console.log(error);
   }
};
// connectDB devuelve una promesa xeso es con await y la fcn es async

start();

/* 

npx create-react-app .

npm install normalize.css
import 'normalize.css' in index.js
SET BEFORE 'index.css'

npm install styled-components
import styled from 'styled-components';

npm install history@5 react-router-dom@6
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

npm install axios
import axios from 'axios';

npm install moment
import moment from 'moment';

npm i jodit-react

npm install framer-motion
import { motion } from "framer-motion"




▦▦▦▦▦▦▦▦▦▦ SERVER ▦▦▦▦▦▦▦▦▦▦

npm install nodemon --save-dev
"start":"nodemon server"

npm install express
import express from 'express';
const app = express();

npm install dotenv
import dotenv from 'dotenv'
dotenv.config()

npm install mongoose
import mongoose from 'mongoose';

npm install validator
import validator from 'validator';

npm install express-async-errors
in server.js
import 'express-async-errors'

npm install http-status-codes
import { StatusCodes } from 'http-status-codes';

npm install bcryptjs
import bcrypt from 'bcryptjs'

npm install jsonwebtoken
import jwt from 'jsonwebtoken'

npm install concurrently --save-dev

npm install morgan
import morgan from 'morgan';

npm install react-icons



*/
