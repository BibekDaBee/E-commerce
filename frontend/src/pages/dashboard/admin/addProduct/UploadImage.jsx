import React, { useState } from 'react'
import axios from 'axios'
import { getBaseURL } from '../../../../utils/baseURL';

const UploadImage = ({name, setImage}) => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    // Base64 functionality

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    // request to upload a file
    const uploadSingleImage = (base64) => {
        setLoading(true);
        axios.post(`${getBaseURL()}/uploadImage`, {image: base64})
        .then((res) => {
            const imageUrl = res.data.url;
            // console.log("Image URL from server:", imageUrl);
            setUrl(imageUrl);
            alert("Image Uploaded successfully")
            setImage(imageUrl);
        })
        .then(() => setLoading(false))
        .catch((error) => {
            console.error("Error Uploading image", error);
            setLoading(false);
        })
    }

    const uploadImage = async (event) =>{
        const files = event.target.files;
        if(files.length ===1 ){
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }

        const base64s = [];
        for (let i =0; i<files.length; i++){
            const base = await convertBase64(files[i])
            base64s.push(base)
        }
    }
    // console.log("Rendering with URL:", url);

  return (
    <div>
        <label htmlFor={name}>Upload Image</label>
        <input type='file' name={name} id={name} onChange={uploadImage} className='add-product-InputCSS'/>
        {
            loading && (
                <div className='mt-2 text-sm text-blue-600'>Product uploading...</div>
            )
        }
        {
            url && (
                <div key={url} className="mt-2 text-sm text-green-600">
                    <p>Image Uploaded Successfully!</p>
                    <img 
                        src={url} 
                        alt="Uploaded Image" 
                        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                    />
                </div>
            )
        }
    </div>
  )
}

export default UploadImage;