/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express';
import cors from 'cors';

export default interface HttpServer {
  register(method: string, url: string, callback: Function): void;
  listen(port: number): void;
}

export class ExpressAdapter implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  register(method: string, url: string, callback: Function): void {
    this.app[method](
      url.replace(/\{|\}/g, ''),
      async (req: Request, res: Response) => {
        try {
          const output = await callback(req.params, req.body);
          res.json(output);
        } catch (e: any) {
          console.log('error', e.message);
          res.status(422).json({
            message: e.message,
          });
        }
      }
    );
  }

  listen(port: number): void {
    this.app.listen(port);
  }
}
