const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const port = 8000;
const app = express();

app.use(express.static('./assets'))
app.use(expressLayouts);

//extract styles and scripts from sub-pages
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

//use express router
app.use('/', require('./routes'));  // require('./routers') will also work since router points to index bydefault


//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port,(err)=>{
    if(err) console.log(err);
    else console.log(`listening on ${port}`);
})
