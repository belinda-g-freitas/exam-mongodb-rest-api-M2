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
server.use(express.static(path.join(__dirname, 'public')));
// 

const routers = require('./routes/index');
// 
server.use(`${globals.apiRoute}country`, routers.country);
server.use(`${globals.apiRoute}location`, routers.location);
// server.use(`${globals.apiRoute}reservation`, reservationsRouter);
server.use(`${globals.apiRoute}track`, routers.track);
// server.use(`${globals.apiRoute}schedule`, schedulesRouter);
// server.use(`${globals.apiRoute}vehicle`, vehiclesRouter);
server.use(`${globals.apiRoute}review`, routers.companyReview);
server.use(`${globals.apiRoute}company`, routers.company);
server.use(`${globals.apiRoute}user`, routers.user);
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