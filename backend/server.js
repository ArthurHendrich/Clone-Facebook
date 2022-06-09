const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Connection Back/Front
const app = express();
app.use(express.json())
app.use(cors());

// Connect Routes
const { readdirSync } = require('fs');
readdirSync('./routes').map(r => app.use('/', require('./routes/' + r)));

// DB connection
const mongoose = require('mongoose');
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected sucessfuly"))
  .catch((err) => console.log("Error connecting to DataBase", err));


// Generate server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

