import { CreateSchema } from '../../helpers/createSchema';
import mongoose from 'mongoose';

const schema = CreateSchema(
     {
        text: { type: String },
        user : { type : String }
      }
  );

  module.exports = mongoose.model('GlobalMessages', schema);