import "dotenv/config";
import cors from 'cors';
import express from 'express';

import controllerPets from './Controller/controllerPets.js';

let servidor  = express();
servidor.use(cors());
servidor.use(express.json());

servidor.use(controllerPets);

servidor.listen(process.env.PORT, () => console.log(`API está no ar na porta ${process.env.PORT}`))