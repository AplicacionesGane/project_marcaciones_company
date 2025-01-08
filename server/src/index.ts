import { PORT, CORS_ORIGINS } from './config';
import express from 'express';
import logs from 'morgan';
import cors from 'cors';

import { marcacionRouter } from './routes/marcacion.routes';
import { opcionesRouter } from './routes/opciones.routes';
import { personaRouter } from './routes/persona.routes';
import { areasRouter } from './routes/areas.routes';
import { infoRoutes } from './routes/info.routes';
import { db_connection } from './connections';

const app = express();

app.use(cors({ origin: CORS_ORIGINS, credentials: true }));
app.use(express.json());
app.use(logs('dev'));

app.use('/', infoRoutes);
app.use('/', marcacionRouter);
app.use('/', opcionesRouter);
app.use('/', personaRouter);
app.use('/', areasRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

db_connection.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch((error) => console.log(error));