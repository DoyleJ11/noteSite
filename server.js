const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient


MongoClient.connect("mongodb+srv://doylej:Conner11@cluster0.dprcs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('note-app')
    const noteCollection = db.collection('notes')
    

    app.set('view engine', 'ejs');
    app.engine('ejs', require('ejs').__express);
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/', (req, res) => {
        db.collection('notes').find().toArray()
        .then(results => {
            res.render('index.ejs', { notes: results })
        })
        .catch(error => console.error(error))
      })
    
      app.post('/messages', (req, res) => {
        noteCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
      })
    
    app.listen(4000, function() {
        console.log('listening on 4000');
    })
  })
  .catch(error => console.error(error))
