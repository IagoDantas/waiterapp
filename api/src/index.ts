import express from 'express';
import mongoose from 'mongoose';
import {router} from './router';
import * as dotenv from 'dotenv';
import path from 'node:path';

dotenv.config();
const CONNECTIONSTRING = process.env.MONGO_KEY || '';
mongoose.connect(CONNECTIONSTRING,)
  .then(()=> {
    const app = express();
    const port = 3001;

    app.use('/uploads',express.static(path.resolve(__dirname,'..','uploads')));//cria uma rota para acessar os arquivos que estão na pasta uploads e diz que estes arquivos são estáticos
    app.use(express.json());
    app.use(router);

    app.listen(port,()=>{
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch(()=> console.log('❌ Failed to connect to MongoDB'));
