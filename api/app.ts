import express, { Express, Request, Response , Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import OrderRoutes from './routes/Order.route';
import ProductRoutes from './routes/Product.route';

dotenv.config()

const app: Application = express();
const port = process.env.PORT || 8000

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server')
});

app.use('/order', OrderRoutes)
app.use('/products', ProductRoutes)

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
});