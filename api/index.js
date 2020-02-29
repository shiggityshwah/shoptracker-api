import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fishbowlRoutes from './server/routes/FishbowlRoutes';
import shoptrackerRoutes from './server/routes/ShoptrackerRoutes';

config.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use('/api/v1/fishbowl', fishbowlRoutes);
app.use('/api/v1/shoptracker', shoptrackerRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this API.',
}));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;