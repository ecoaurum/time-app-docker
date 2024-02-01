import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {
  readRecords,
  insertRecord,
  deleteRecord,
} from './src/utils/records.mjs'

const PORT = 5000

const app = express()

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://time-app-docker-frontend.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

const corsOptions = {
  origin: 'https://time-app-docker-frontend.vercel.app',
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: false,
  allowedHeaders: 'Content-Type,Authorization',
}
app.use(cors(corsOptions))

app.get('/', (_, res) => {
  res.send('Greetings from the time saving service!')
})

app.get('/times', async (_, res) => {
  res.send(await readRecords())
})

app.post('/times', async (req, res) => {
  res.send(await insertRecord(req.body.time))
})

app.delete('/time/:id', async (req, res) => {
  res.send(await deleteRecord(req.params.id))
})

app.listen(PORT, () => {
  console.log(`Express web server is running at http://localhost:${PORT}`)
})
