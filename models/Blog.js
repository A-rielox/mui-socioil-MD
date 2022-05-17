import mongoose from 'mongoose';
import { categoryList } from '../utils/index.js';

const BlogSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: [true, 'Favor proveer un titulo.'],
         minlength: 5,
         maxlength: 150,
      },
      desc: {
         type: String,
         required: [true, 'Favor proveer una descripción'],
         minlength: 5,
         maxlength: 3500,
      },
      // category: {
      //    type: [String],
      //    enum: categoryList,
      //    default: 'general',
      //    trim: true,
      //    required: [true, 'Favor proveer una categoria'],
      // },

      category: {
         type: String,
         enum: categoryList,
         default: 'general',
         trim: true,
         required: [true, 'Favor proveer una categoria'],
      },
      createdBy: {
         type: mongoose.Types.ObjectId,
         ref: 'User',
         required: [true, 'Please provide user'],
      },
      // admin
      onHold: {
         type: Boolean,
         default: false,
         required: [true, 'Please provide a value'],
      },
      news: {
         type: Boolean,
         default: false,
         required: [true, 'Please provide a value'],
      },
      featured: {
         type: Boolean,
         default: false,
         required: [true, 'Please provide a value'],
      },
   },
   { timestamps: true }
);

export default mongoose.model('Blog', BlogSchema);

// los required q tienen default es para q al crear o modificar nome pacen vacios
