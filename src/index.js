const express = require('express');
const mongoose = require('mongoose');
const Sales = require('./model/saleDataModel')
const PORT = 7000;

const app = express();
app.use(express.json());

// connection
const connectDb = require('./config/connection')
connectDb();

const dataRoutes = require('./routes/salesDataRoutes');
app.use('/api/',dataRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})