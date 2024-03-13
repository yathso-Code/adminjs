import axios from 'axios'; // Import axios for making HTTP requests
// let fetch from 'node-fetch';
const fetch = require('node-fetch');
import https from 'https';
import { Get, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CheckUserIsExitMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('This is Middleware.=>', req.body);
    

    try {
      let id = req.body.userid;
    console.log("id=>", id);
      const response = await fetch(`https://localhost:3000/user/get/${id}`, {
              method: 'GET',
              agent: new https.Agent({ rejectUnauthorized: false })
      });

      const result = await response.json();
      console.log("RESULT => ", result);


    } catch (error) {
      console.error('Error fetching user:', error);
    }

    next();
  }
}
