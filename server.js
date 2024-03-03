const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db/connect');
const globals = require('./utils/globals')
// 
const server = express();
const port = process.env.PORT;
//
server.use(cors());
server.use(express.urlencoded({ extended: false }))
server.use(express.json());
server.disable('x-powered-by');
// 

const routers = require('./routes/index');
// 
server.use(`${globals.apiRoute}loan`, routers.loan);
server.use(`${globals.apiRoute}book`, routers.book);
server.use(`${globals.apiRoute}author`, routers.author);

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URL);
    
    server.listen(port, (err) => {
      if (err) console.log("Error while starting server");
      console.log(`Server running at http://localhost:${port}/`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();