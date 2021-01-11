const express = require('express');
const app = express();
require('dotenv/config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')


const api = process.env.API_URL;
const productRouter = require('./routers/products')


app.use(cors());
app.options('*',cors())

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'))



//Router
app.use(`${api}/products`, productRouter)



mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'eshop-database'

}).then(()=>{
    console.log('Database Connection is ready...')
}).catch((err)=>{
      console.log(err);
})

app.listen(3010,()=>{
    console.log(api);
    console.log('server is running http://localhost:3010');
})