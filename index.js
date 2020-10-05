const express = require('express')
const bodyParser=require('body-parser');
const cors =require('cors');
const { ObjectID } = require('mongodb');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://asifhasan:asif2189@cluster0.gbfwa.mongodb.net/volunteer-network?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
 
client.connect(err => {
  const works = client.db("volunteer-network").collection("works");
  const registers = client.db("volunteer-network").collection("registers");
app.post('/addWorks',(req,res)=>{
  const work=req.body;
  works.insertMany(work)
  .then(result=>{
    res.send(result.insertedCount>0)
  })
})
app.get('/works',(req,res)=>{
 works.find({})
 .toArray((err,document)=>{
   res.send(document)
 })  
})
app.get('/works/:id',(req,res)=>{
  const id=req.params.id;
  works.find({_id:ObjectID(id)})
  .toArray((err,document)=>{
    res.send(document[0])
  })  
 })
 app.post('/registration',(req,res)=>{
  const register=req.body;
  registers.insertOne(register)
  .then(result=>{
    console.log(result)
    res.send(result.insertedCount>0)
  })
})
app.get('/registers',(req,res)=>{
  registers.find({email:req.query.email})
  .toArray((err,document)=>{
    res.send(document)
  })  
 })
 app.get('/registersList',(req,res)=>{
  registers.find({})
  .toArray((err,document)=>{
    res.send(document)
  })  
 })
 app.delete('/delete/:id',(req,res)=>{
   const key=req.params.id
  registers.deleteOne({_id:key})
  .then(result=>{
       res.send(result.deletedCount>0)
  })
})
app.delete('/deleteEvent/:id',(req,res)=>{
  const key=(req.params.id)
 registers.deleteOne({_id:key})
 .then(result=>{
      res.send(result.deletedCount>0)
 })
})
});

app.listen(7000)