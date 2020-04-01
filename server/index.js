require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      ctrl = require('./controllers/Controller'),
      port = SERVER_PORT,
     
     app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret:SESSION_SECRET,
    cookie:{maxAge: 1000 * 60* 60 * 24}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}    
}).then(db=> {
    app.set('db', db);
    console.log('db connected')
});

app.post ('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
app.get('/auth/logout', ctrl.logout)


app.get('api/posts/:id', ctrl.getPosts)
app.get('api/post/:id', ctrl.getSinglePost)
app.post('api/posted/:id',ctrl.addPost)

app.listen(port, () => console.log(`Server running on ${port}`));