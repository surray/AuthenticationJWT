const express = require('express');
const app = express();
const mongoose =require('mongoose');
const userRouter = require('./userRouter');
const morgan =require('morgan');
const cors =require('cors');
const path =require('path');
const dotenv = require('dotenv')
dotenv.config();

app.use(express.json());
app.use(morgan('dev'));


app.use(cors());

app.use("/api",userRouter);


app.listen(process.env.PORT || 5000,()=>{
console.log("listening in port 5000");
})

app.use(express.static(path.join(__dirname, "/authen/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/authen/build', 'index.html'));
});

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("DB connected surely");
})