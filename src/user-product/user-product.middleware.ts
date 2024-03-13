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
    let id = req.body.userid;
    console.log("id=>", id);

     
    fetch(`http://localhost:3000/user/get/${id}`)
    .then((result) => {
      return result.json(); // Corrected method name to lowercase "json"
    })
    .then((data) => {
      console.log("Response:", data);
      next(); // Log the parsed JSON data
    })
    .catch((err) => {
      console.log("Error:", err); // Log any errors that occurred
    });
  
  }
}
