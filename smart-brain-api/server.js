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
})

app.post('/signin',(req,res)=>{
    db.select('email','hash').from('login').where('email','=',req.body.email)
    .then(data=>{
        const isValid=bcrypt.compareSync(req.body.password,data[0].hash)
        if(isValid){
            db.select('*').from('users').where('email','=',req.body.email)
            .then(user=>{
                res.json(user[0])
            })
            .catch(eer=>res.status(400).json('unable to get user'))
        }else{
            res.status(400).json('invalid password or email')
        }   
    })
    .catch(err=>{res.status(400).json('wrong credentials')})
})

app.post('/register',(req,res)=>{
    const {email,name,password}=req.body;
    const hash=bcrypt.hashSync(password);
    db.transaction(trx=>{
        trx.insert({
            hash: hash,
            email:email,
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0],
                name:name,
                joined:new Date(),
            })
            .then(user=>{
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>res.status(400).json('unable to register'))
})

app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;
    db.select('*').from('users').where('id',id)
    .then(user=>{
        if(user.length){
            res.json(user[0])
        }else{
            res.status(400).json("Not Found")
        }
    })
    .catch(err=>{res.status(400).json('Error getting user')})
})

app.put('/image',(req,res)=>{
    const {id}=req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err=>res.status(400).json('unable to get entries'))
})


app.listen(3000,()=>{
})
