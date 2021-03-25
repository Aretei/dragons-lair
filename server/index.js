// const express = require('express')
// const session = require('express-session')
// const massive = require('massive')
// const authCtrl = require('./controllers/authController')
// require('dotenv').config()
// const PORT = 4000

// const { CONNECTION_STRING, SESSION_SECRET } = process.env

// const app = express()

// app.use(express.json())

// app.use(session ({
//     secret: SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }))

// app.post('/auth/register', authCtrl.register)

// massive ({
//     connectionString: CONNECTION_STRING,
//     ssl: {
//         rejectUnauthorized: false
//     }
// })
// .then(dbInstance => {
//     app.set('db', dbInstance)
//     app.listen(PORT, () => console.log(`server is running on ${PORT}`))
// })
// .catch(e => console.log(e))

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController');

const PORT = 4000;

const { SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db);
  console.log('db connected');
});

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
  })
);

app.post('/auth/register', authCtrl.register);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));




