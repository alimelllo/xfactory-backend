import { CreateSchema } from '../../helpers/createSchema';
import mongoose from 'mongoose';

const schema = CreateSchema({
    gameValue: { type: Number },
  });

  module.exports = mongoose.model('Game', schema);