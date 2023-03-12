import { Request, Response } from 'express';
import { GlobalMessages } from '../models';



const MessageList = async (req: Request | any, res: Response) => {

 res.setHeader('Content-Type', 'application/json')
 try {
    GlobalMessages.find({}).then((messages: any) => {
      res.status(200).send(messages);
    });
   }
 catch (err) {
     return console.log(res, err)
   }
};


export { MessageList };