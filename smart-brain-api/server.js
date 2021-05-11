const express = require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const app=express();
app.use(bodyParser.json());
app.use(cors())
const knex=require('knex');
const { response } = require('express');

const db=knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password:'1',
        database:'smart-brain',
    }
})

app.get('/',(req,res)=>{
    res.json(database.users);
})

app.post('/signin',(req,res)=>{
    if(req.body.email===database.users[0].email &&
        req.body.password===database.users[0].password ){
            res.json(database.users[0]);
    }else{
        res.json('error ');
    }
})

app.post('/register',(req,res)=>{
    const {email,name}=req.body;
    db('users')
    .returning('*')
    .insert({
        email:email,
        name:name,
        joined:new Date(),
    })
    .then(response=>{
        res.json(response);
    })
    .catch(err=>res.status(400).json('unable to register'))
})

app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;//not understand
    let found=false;
    database.users.forEach((user)=>{
        if(user.id===id){
            found=true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json('not found')
    }
})

app.put('/image',(req,res)=>{
    const {id}=req.body;
    let found=false;
    database.users.forEach((user)=>{
        if(user.id===id){
            found=true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(400).json('not found')
    }
})


app.listen(3000,()=>{
})
