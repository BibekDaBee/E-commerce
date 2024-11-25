const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const app = express()
const port = process.env.PORT || 3000;

//middleware setup
app.use(express.json({limit:"25mb"}));
app.use(express.urlencoded({limit:"25mb"}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))

//image Upload
const uploadImage = require("./src/utils/uploadImage")

// All routes
const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router');
const orderRoutes = require('./src/orders/orders.route');
const statsRoutes = require('./src/stats/stats.route')

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stats", statsRoutes);



main().then(() => console.log("Mongobd is successfully connected")).catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URI);
    app.get('/', (req, res) => {
        res.send('E-commerce Server is running!')
      })
  }

  app.post("/uploadImage", (req, res) => {
    const { image } = req.body;

    if (!image) {
        console.error("No image provided in request.");
        return res.status(400).send({ message: "Image is required" });
    }

    uploadImage(image)
        .then((url) => {
            console.log("Image uploaded successfully:", url);
            res.send({ url });
        })
        .catch((err) => {
            console.error("Error uploading image to Cloudinary:", err);
            res.status(500).send({ message: "Image upload failed", error: err.message });
        });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})