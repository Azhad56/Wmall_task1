const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = 3000;
var connectionString = 'mongodb+srv://<username>:<Password>@cluster0.igivj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
MongoClient.connect(connectionString)
    .then(client => {
        const dbo = client.db("starwars-quotes");
        const collection = dbo.collection("quotes");
        console.log("Connected To Database")
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }));
        app.get('/', function(req, res) {
            res.sendFile(__dirname + '/index.html');
            dbo.collection('quotes').find().toArray()
                .then(res => console.log(res))
                .catch(err => console.log(err))
        })
        app.post('/quotes', (req, res) => {
            collection.insertOne(req.body)
                .then(result => res.redirect("/"))
                .catch(err => console.log(err))
        })
        app.listen(PORT, function() {
            console.log("Listening on PORT 3000");
        });
    })
    .catch(err => { console.log(err) })