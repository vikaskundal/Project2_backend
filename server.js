const express = require('express');
const path = require('path');
const cors = require('cors');
const app=express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { connectedDB } = require('./db');
const authRoutes = require('./Router/authRoutes');
const productRoutes = require('./Router/productRoute'); 

dotenv.config();



// connect to the mongoDB
connectedDB();
// Definning the routes
app.use(express.json());
app.use(cors());

// login and SignUp
app.use('/auth', authRoutes);
//Product routes
app.use('/api',productRoutes);
// Serve static files from React build folder
// Serve static files from Vite's dist folder
// app.use(express.static(path.join(__dirname, 'dist')));

// Send index.html for any route (client-side routing support)
// Serve React's build folder in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}




const PORT=process.env.PORT 
 app.listen( PORT,()=>{
    console.log(`server is running on the ${PORT}`)
 });