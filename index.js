const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const port = 8000;
const app = express();

app.use(express.urlencoded({ extended: true})); 
app.use(cookieParser())
app.use(express.static('./assets'))
app.use(expressLayouts);

//extract styles and scripts from sub-pages
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

//use express router


//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:'Connection-and-Chat',
    //TODO: change secret the secret before deplploying in production mode
    secret:'blahblah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: (1000*60*100)
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));  // require('./routers') will also work since router points to index bydefault

app.listen(port,(err)=>{
    if(err) console.log(err);
    else console.log(`listening on ${port}`);
})
