import React, { useContext, useState } from 'react'
import { categoryList } from './AddProductCategoryData'
import myContext from '../../context/myContext'
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { fireDB } from '../../firebase/FirebaseConfig';
import Loader from '../../components/loader/Loader';
const AddProduct = () => {
  const context = useContext(myContext);
  const {loading,setLoading}=context;

  const navigate = useNavigate();
  // product state
  const [product,setProduct] = useState({
    title:"",
    price:"",
    productImageUrl:"",
    category:"",
    description:"",
    quantity:1,
    time:Timestamp.now(),
    date:new Date().toLocaleString(
      "en-US",
      {
        month:"short",
        day:"2-digit",
        year:"numeric",
      }
    )
  })
  // product function -- data send to firebase
  const addProductFunction=async()=>{
  // validation--check in frontend is data exist or not.
  if (product.title == "" || product.price == "" || product.productImageUrl == "" || product.category == "" || product.description == "") {
    return toast.error("All fields are required")
   }
   setLoading(true);
   try {
    // prodct is our databasename
    const productRef = collection(fireDB,'products');
    // to store product details in firebase and adddoc help 
    await addDoc(productRef,product);
    toast.success("Add product Successfully");
    navigate('/admin-dashboard');
    setLoading(false);
   } catch (error) {
    console.log(error);
    setLoading(false);
    toast.error("All product failed");
   }

  }
  return (
    <div>
            <div className='flex justify-center items-center h-screen'>
              {loading && <Loader/>}
                {/* Login Form  */}
                <div className="login_Form bg-blue-50 px-8 py-6 border border-blue-100 rounded-xl shadow-md">
                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-blue-500 '>
                          Add Product
                        </h2>
                    </div>

                    {/* Input One for title */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            placeholder='Product Title'
                            value={product.title}
                            onChange={(e)=>{
                              setProduct({
                                ...product,
                                title:e.target.value
                              })
                            }}
                            className='bg-blue-50 text-blue-300 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-300'
                        />
                    </div>

                    {/* Input Two  for product price*/}
                    <div className="mb-3">
                        <input
                            type="number"
                            placeholder='Product Price'
                            value={product.price}
                            onChange={(e)=>{
                              setProduct({
                                ...product,
                                price:e.target.value
                              })
                            }}
                            className='bg-blue-50 text-blue-300 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-300'
                        />
                    </div>

                    {/* Input Three for image url  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder='Product Image Url'
                            value={product.productImageUrl}
                            onChange={(e)=>{
                              setProduct({
                                ...product,
                                productImageUrl:e.target.value
                              })
                            }}
                            className='bg-blue-50 text-blue-300 border border-blue-200 px-2 py-2 w-96 rounded-md outline-none placeholder-blue-300'
                        />
                    </div>

                    {/* Input Four  */}
                    <div className="mb-3">
                        <select
                         value={product.category}
                         onChange={(e)=>{
                           setProduct({
                             ...product,
                             category:e.target.value
                           })
                         }}
                        className="w-full px-1 py-2 text-blue-300 bg-blue-50 border border-blue-200 rounded-md outline-none  ">
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Input Five  */}
                    <div className="mb-3">
                        <textarea name="description" placeholder="Product Description" rows="5" 
                         value={product.description}
                         onChange={(e)=>{
                           setProduct({
                             ...product,
                             description:e.target.value
                           })
                         }}
                        className=" w-full px-2 py-1 text-blue-300 bg-blue-50 border border-blue-200 rounded-md outline-none placeholder-blue-300 ">
                        </textarea>
                    </div>

                    {/* Add Product Button  */}
                    <div 
                    onClick={addProductFunction}
                    className="mb-3">
                        <button
                            type='button'
                            className='bg-blue-500 hover:bg-blue-600 w-full text-white text-center py-2 font-bold rounded-md '
                        >
                          Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddProduct