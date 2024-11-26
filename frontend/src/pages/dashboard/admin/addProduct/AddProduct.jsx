import React, { useState } from "react";
import { useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";
import { useAddProductMutation } from "../../../../redux/features/products/productsAPI";

// category
const categories = [
  { label: "Select Category", value: "" },
  { label: "Accessories", value: "Accessories" },
  { label: "Dress", value: "dress" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
];


const colors = [
  { label: "Select Color", value: "" },
  { label: "Black", value: "black" },
  { label: "Red", value: "red" },
  { label: "Gold", value: "gold" },
  { label: "Blue", value: "blue" },
  { label: "Silver", value: "silver" },
  { label: "Beige", value: "beige" },
  { label: "Green", value: "green" },
];

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    color: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState("");

  const [AddProduct, {isLoading, error}] = useAddProductMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const navigate = useNavigate(); 

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!product.name || !product.category || !product.price || !product.description || !product.color){
      alert('Please fill all required field')
    }
    try {
      await AddProduct({...product, image, author: user?.id}).unwrap();
      alert('Prodcut added successfully');
      setProduct({
        name: "",
        category: "",
        color: "",
        price: "",
        description: "",
      })
      setImage('');
      navigate("/dashboard/manage-products")

    } catch (error) {
      console.log("Failed to submit product",error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          Label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          type="text"
          placeholder="Product Name"
        />

        <SelectInput
          Label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        <SelectInput
          Label="Colors"
          name="color"
          value={product.color}
          onChange={handleChange}
          options={colors}
        />

        <TextInput
          Label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          type="number"
          placeholder="Example: 200"
        />

        <UploadImage
        name= "image"
        id = 'image'
        value= {e => setImage(e.target.value)}
        placeholder="Write a product description"
        setImage = {setImage}
        />

        <div>
        <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
        <textarea name="description" id="description" className="add-product-InputCSS" value={product.description}
        placeholder="Write a product description" onChange={handleChange}></textarea>
        </div>

        <div>
          <button type="submit" className="add-product-btn" >
          Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
