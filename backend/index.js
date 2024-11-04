const express = require('express')
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const app = express()
const port = process.env.PORT || 3000;


main().then(() => console.log("Mongobd is successfully connected")).catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
    app.get('/', (req, res) => {
        res.send('E-commerce Server is running!')
      })
  }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})