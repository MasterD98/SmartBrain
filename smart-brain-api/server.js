const express = require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const app=express();
app.use(bodyParser.json());
app.use(cors())
const database={
    users:[
        {
            id:'123',
            name:'John',
            email:'john@gmail.com',
            password:'cookies',
            entries:0,
            joined:new Date()
        },
        {
            id:'124',
            name:'Sally',
            email:'sally@gmail.com',
            password:'bananas',
            entries:0,
            joined:new Date()
        }
    ],
    login:[
        
    ]
}

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
    database.users.push({
        id:'125',
        name:name,
        email:email,
        entries:0,
        joined: new Date(),
    })
    res.json(database.users[database.users.length-1]);
    
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
    console.log(id);
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
