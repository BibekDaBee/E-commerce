const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  cloudinary.api.resources((error, result) => {
    if (error) {
        console.error("Error with Cloudinary credentials:", error);
    } else {
        console.log("Cloudinary credentials are valid:");
    }
});


  const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
  }

  module.exports = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            console.log("Cloudinary Response:", { error, result });
            if (result && result.secure_url) {
                return resolve(result.secure_url);
            }
            console.error("Cloudinary Upload Error:", error);
            return reject({ message: error?.message || "Upload failed" });
        });
    });
};