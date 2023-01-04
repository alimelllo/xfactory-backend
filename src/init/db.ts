import mongoose from 'mongoose';

export default () => {
  const mongoString = 'mongodb+srv://betgame:betgame123456@cluster0.hqizkj2.mongodb.net';

  mongoose.set('strictQuery', true);
  mongoose.connect(mongoString, {}, (error: any) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Database Connected');
    }
  });
};
