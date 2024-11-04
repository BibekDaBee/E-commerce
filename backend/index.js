const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = process.env.PORT || 3000;

main().then(() => console.log("Mongobd is successfully connected")).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://admin:<password>@e-commerce.7pbpd.mongodb.net/?retryWrites=true&w=majority&appName=e-commerce');
    app.get('/', (req, res) => {
        res.send('E-commerce Server is running!')
      })
  }

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})