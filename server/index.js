require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
    //   session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      authCtrl = require('./controllers/authController'),
      postCtrl = require('./controllers/postController'),
      port = SERVER_PORT,
     
      app = express();

app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}    
}).then(db=> {
    app.set('db', db);
    console.log('db connected')
});

app.post ('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.get('/api/logout', authCtrl.logout)


app.listen(port, () => console.log(`Server running on ${port}`));