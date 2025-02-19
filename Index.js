const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRouter = require('./routes/product.routes');
const userRouter = require('./routes/user.routes');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/user', userRouter);

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});