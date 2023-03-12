import { CreateSchema } from '../../helpers/createSchema';
import mongoose from 'mongoose';

const schema = CreateSchema({
    gameValue: { type: Number },
    gameIsRuning : { type: Boolean } ,
  });

  module.exports = mongoose.model('Game', schema);