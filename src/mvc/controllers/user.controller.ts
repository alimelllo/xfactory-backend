import { Request, Response } from 'express';
import { getIDfromToken } from '../../helpers/getIDfromToken';
import { transStrings } from '../../init/locales';
import { User } from '../models';
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// const UserProfile = (req: Request | any, res: Response) => {
//   const user_id = getIDfromToken(req);
//   console.log('user_id', user_id);
//   return User.findById(user_id, function (err, user) {
//     if (err) throw err;

//     if (!user) {
//       res.status(403).json({
//         success: false,
//         message: req.i18n.t('simpleStringWithVariable', {
//           variable1: '3',
//           variable2: '3',
//         }),
//       });
//     } else if (user) {
//       res.status(200).send({
//         success: true,
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           mobile: user.mobile,
//         },
//       });
//     }
//   });
// };
const UserUpdate = async (req: Request | any, res: Response) => {
  const user_id = getIDfromToken(req);
  console.log('user_id', user_id);
  const { email, password, name } = req.body;
  if (email) delete req.body.email;
  if (name) req.body.name = name;
  if (password) {
    const newPassword = bcrypt.hashSync(password, saltRounds);
    req.body.password = newPassword;
  }
  const user = await User.findOneAndUpdate({ _id: user_id }, { $set: req.body }, { new: true });

  return res.status(200).send({
    success: true,
    message: req.t(transStrings.profileupdatedsuccessfuly),
    user: user,
  });
};

const UsersList = async (req: Request | any, res: Response) => {


    /*
    #swagger.tags = ["users"]
    #swagger.description = 'Get all users'
  */
 
 // Recognizes the 'consumes' automatically
 res.setHeader('Content-Type', 'application/json')
 try {
     /* #swagger.responses[200] = {
       description: "Users fetched successfully",
       schema: { $ref: "#/definitions/users"
     } */
     User.find({}).then((users: any) => {
      res.status(200).send(users);
    });
   } catch (err) {
     /* #swagger.responses[500] = {
       description: "Unknown server side error",
       schema:  { $ref: "#/definitions/server side error" }
     } */
     return console.log(res, err)
   }
};

// export { UserProfile, UserUpdate };
export { UserUpdate, UsersList };
