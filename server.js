const express = require('express');
const cors = require('cors');
require('dotenv').config();

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
server.use(`${globals.apiRoute}autor`, routers.autor);
// server.use('/', );

server.listen(port, (err) => {
  if (err) console.log("Error while starting server");
  console.log(`Server running at http://localhost:${port}/`);
});

/**# [transport-ticket-booking](https://github.com/belinda-g-freitas/transport-ticket-booking)
This project is a fullstack transport ticket booking server.
## TECHNOLOGIES
### Web frontend

- HTML 5
- Boostrap 4

###  Backend & globals.apiRoute

- Node.JS v18.17.1
- MYSQL  8.0.34-0

### Mobile (Android)

- Dart
- Flutter */