const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let listItems = ["First Thing", "Second Thing", "Third Thing"];

// var urlencodedParser = bodyParser.urlencoded({ extended: true })

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.get('/', function(req, res){


    const days = ["Sunday","Monday","Tuesday","Thursday","Wendsday","Friday","Saturday"];

    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    
    let Today = new Date();
    let currentDay = Today.toLocaleDateString("en-US", options);

    res.render('index', {Foo : currentDay, newItems : listItems});
    //here index is file called index.ejs

    // res.write(" " + days[currentDay]);
    // res.send();
});


app.post('/',function(req,res){

    const data = req.body.textInput;
    // console.log(data);
    listItems.push(data);
    res.redirect('/');

})

app.listen(3000 , function(){
    console.log("Server is Running on Port 3000 !");
});