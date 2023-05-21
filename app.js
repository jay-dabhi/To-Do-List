const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/ToDoListDB');

function getDate(){
    const date2 = new Date();
    const year = date2.getFullYear();
    var
     temp = date2.getMonth();

    for(var i=1; i<10;i++){
        if(temp === i){
            temp = "0"+temp;
        }
        else{
            temp;
        }
    }
    const date = date2.getDate();
    
    const time = year + "-" + temp + "-" + date;
    
    return time;

}

const date1 = getDate(); 
console.log(date1);

const nameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: String
})

const item = mongoose.model("item", nameSchema);


const item1 = new item({
    name: "complate mongoProject",
    date: getDate()
})

const item2 = new item({
    name: "Solve DSA Questions",
    date: getDate()

})

const item3 = new item({
    name: "Maintain Fitness",
    date: getDate()

})



const array = [item1, item2, item3];

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))




app.get('/', async function (req, res) {

    const days = ["Sunday", "Monday", "Tuesday", "Thursday", "Wendsday", "Friday", "Saturday"];
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let Today = new Date();
    let currentDay = Today.toLocaleDateString("en-US", options);

    
    async function insert(array) {
        await item.insertMany(array);
    }


    const data = await item.find({});

    if (data.length === 0) {
        insert(array);
        res.redirect('/');


    }
    else {
        res.render('index', { Foo: currentDay, newItems: data });


    }
    //here index is file called index.ejs

    // res.write(" " + days[currentDay]);
    // res.send();
});

app.post('/', function (req, res) {
    console.log(res.statusCode);
    const data = req.body.textInput;
    // console.log(data);

    const newItem = new item({
        name: data,
        date: getDate()
    })

    newItem.save();
    res.redirect('/');
    console.log(res.statusCode);

})




app.post('/date', async function (req, res) {
    const date1 = req.body.date;
    console.log(date1);

    const data = await item.find({date:date1 });

    // console.log(data);

    // data.forEach(function(item){
    //     console.log(item.name);
    // })


    const days = ["Sunday", "Monday", "Tuesday", "Thursday", "Wendsday", "Friday", "Saturday"];
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    let Today = new Date();
    let currentDay = Today.toLocaleDateString("en-US", options);

    res.render('index', { Foo: currentDay, newItems: data });

    // const return1 = req.body.return;

    if(req.body.return === true){
        res.redirect('/'); 
        req.body.return = true;
    }
    // console.log(return1);



    

});

app.post('/delet', async function(req,res){
    // console.log(req.body.checkbox);
    const idOfDeletItem = req.body.checkbox;

    await item.deleteOne({_id: idOfDeletItem});

    res.redirect('/');


})


app.listen(3000, function () {
    console.log("Server is Running on Port 3000 !");
});