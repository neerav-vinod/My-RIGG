const express = require('express');
const app = express();

const colors = require('colors')
const env = require('dotenv')
const morgan = require('morgan');
const dbConnection = require('./config/dbConnect');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/ProductRoutes')
const cors = require('cors');


//middleware
app.use(express.json());
env.config();
app.use(morgan('dev'));
app.use(express.static('uploads'));

//cors
app.use(cors());

//DB connection
dbConnection();

const port = process.env.PORT || 3030;

//test route
app.get('/',(req,res)=>{
    res.status(200).send('<h1>Server is Running...</h1>')
})

//real route
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)


app.listen(port, ()=>{
    console.log("Server running on ".bgMagenta.bold+ port.bgMagenta.bold);
})

