const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./mongo'); // Import User model from 'mongo.js'
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Correct directory paths
const templatePath = path.join(__dirname, './templates'); // Fixed typo from "tempelates"
const publicPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('form'); // Render "form.hbs" from the templates folder
});

app.get('/index', (req, res) => {
    res.render('index'); // Render "index.hbs" from the templates folder
});

app.post('/form', async (req, res) => {
    try {
        const {
            fullName,
            dob,
            gender,
            maritalStatus,
            nationality,
            email,
            phone,
            address,
            jobTitle,
            department,
            dateOfJoining,
            employmentType,
            education,
            skills,
            bankName,
            accountNumber,
            resume,
            agreeTerms,
        } = req.body;

        const user = new User({
            fullName,
            dob,
            gender,
            maritalStatus,
            nationality,
            email,
            phone,
            address,
            jobTitle,
            department,
            dateOfJoining,
            employmentType,
            education,
            skills,
            bankName,
            accountNumber,
            resume,
            agreeTerms,
        });

        await user.save();

        console.log('User saved:', user);
        res.status(201).render("home",{
            naming:req.body.name
        });


    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error saving user data');
    }
});

app.post('/index', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user exists in MongoDB
        const user = await User.findOne({ username, password });

        if (user) {
            res.status(201).render('home',{
                naming: req.body.name
            });
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).send('Error during authentication');
    }
});

app.get('/home',(req,res)=>{
    res.render('home');
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
