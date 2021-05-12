const express = require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const app=express();
const knex=require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const cors=require('cors');

const db=knex({
    client:'pg',
    connection:{   
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
})
app.use(bodyParser.json());
app.use(cors())
app.get('/',(req,res)=>{
    res.send("HI");
})

app.post('/signin',signin.handleSignin(db,bcrypt))

app.post('/register',register.handleRegister(db,bcrypt))

app.get('/profile/:id',profile.handleProfile(db))

app.put('/image',image.handelImage(db))

app.post('/imageUrl',image.handleAPICall())


app.listen(process.env.PORT||3000,()=>{
})
