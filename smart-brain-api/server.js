const express = require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const app=express();
app.use(bodyParser.json());
app.use(cors())
const knex=require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

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

app.post('/signin',signin.handleSignin(db,bcrypt))

app.post('/register',register.handleRegister(db,bcrypt))

app.get('/profile/:id',profile.handleProfile(db))

app.put('/image',image.handelImage(db))


app.listen(3000,()=>{
})
