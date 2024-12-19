# E-Commerce MERN Full Stack Project:

<img width="1440" alt="Screenshot 2024-12-18 at 10 25 46 pm" src="https://github.com/user-attachments/assets/0ef1ad02-1e13-4683-919d-58ac1e3d4428" />


## Frontend
Follow the below steps to run the project:
- Firstly clone or unzip the project folder.
- Go to the frontend directory by using the following command `cd frontend`.
- Then run `npm install` commend to install node dependencies.
- Create an .env.local file in the root directory of the backend (at the same level as package.json) and add the following environment variables:

```
VITE_STRIPE_PK = 'your-vite-stripe-key'   
VITE_WEB3FORM_SECRET_KEY = 'your-web3form-secret-key'
```

- Finally, to run the project, use `npm run dev` command.

## Backend
To set up and run the backend:
- Clone or unzip the project folder.
- Go to the backend directory by using the following command `cd backend`.
- Then run `npm install` commend to install node dependencies.
- Create an .env file in the root directory of the backend (at the same level as package.json) and add the following environment variables:

``` 
MONGODB_URI= 'your-database-url'    
JWT_SECRET_KEY = 'your-jwt-secret'  
STRIPE_SECRET_KEY = 'your-stripe-secrer-key'    
CLOUDINARY_CLOUD_NAME = 'your-cloudinary-cloud-name'    
CLOUDINARY_API_KEY= 'your-cloudinary-api-key'   
CLOUDINARY_API_SECRET= 'your-cloudinary-api-secret-key' 
WEB3FORM_SECRET_KEY = 'your-web3form-secret-key'
```
- Finally to run the project use `npm run start:dev`

### Notes
- Ensure that you have Node.js and npm installed on your machine.
- Make sure to replace placeholders in the .env file with actual values.
- If you encounter issues, ensure that the project dependencies are installed correctly and the required services (like a database) are running.

### Happy coding! 🎉
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/25423296/163456776-7f95b81a-f1ed-45f7-b7ab-8fa810d529fa.png">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">
  <img alt="Shows an illustrated sun in light mode and a moon with stars in dark mode." src="https://user-images.githubusercontent.com/25423296/163456779-a8556205-d0a5-45e2-ac17-42d089e3c3f8.png">
</picture>
