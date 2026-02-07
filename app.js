const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const crypto = require('crypto');
const user = require("./models/user");
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public"))); // this line used for static file like(Css, Js, Image)

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "views","login.html"));
})

app.get('/Registration', function (req, res) {
    res.sendFile(path.join(__dirname, "views", "Registration.html"));
})

app.get('/re_password', async (req, res) =>{
    res.sendFile(path.join(__dirname, "views", "re_password.html"));
    try {
        const { Username, Email, Password, Dob } = req.body;
        const existinguser = await user.findOne({email});
        if(existinguser)
        {
            return res.status(400).json({
            message: "Email already Exist"
            });
        }

        const hashedpassword = await bcrypt.hash(Password, 10);
        const User = new user({
            Username,
            Email,
            Password,
            Dob
        });

        await User.save();
        res.status(201).json({
            message: "Registration Successfull"
        });
    } catch (err) {
        res.status(202).json({
            message: "Server Error"
        });
    }
    console.log(req.body);
})


app.listen(3000);