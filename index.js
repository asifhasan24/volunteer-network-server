const express = require('express')
require('dotenv').config

const bodyParser = require('body-parser')
const cors = require('cors')
const port = 7000
const app = express()


app.use(cors())
app.use(bodyParser.json())
const pass = "asif2189"


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://asifhasan:asif2189@cluster0.gbfwa.mongodb.net/volunteer-network?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
client.connect(err => {
    const collection = client.db("volunteer-network").collection("activities");
    console.log('connected successfully')

    app.post('/addInfo', (req, res) => {
        const newInfo = req.body
        collection.inserOne(newInfo) 
            .then(result => {
                res.send(result.insertedCount > 0)
            })
        console.log(newInfo)
    })

     app.get('/info',(req,res)=>{
         collection.find({email: req.query.email})
         .toArray((err,documents)=>{
             res.send(documents)
         })
     })

  

});


app.get('/', (req, res) => {
    res.send('Hellooo World!')
})

app.listen(port, () => {
    console.log('running')
})