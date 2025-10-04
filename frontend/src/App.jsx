import React, { useEffect, useState } from 'react'
import axios from '../src/Api/axios.config'
import PaymentButton from '../src/PaymentButton'
const App = () => {
  const [product, setproduct] = useState('');
  const [price, setprice] = useState('')
  
  useEffect( () => {
      axios.get('/api/product/get-product').then(response=>{
      console.log(response.data.product);
      setproduct(response.data.product)
      setprice(response.data.product.price)
    
    })
  },[])

  const {tittle,discription,image}=product;
  const {amount,currency} = price
  
  
  const onBuy=()=>{
    console.log("not yet");
    
  }


  
  // useEffect(async () => {
  //   const response= await axios.get('/api/get-product')
  //     console.log(response.data);
  //     setproduct(response.data.product)
  //     return response.data
  // }, [])
  
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={image} alt={tittle} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-2">{tittle}</h2>
        <p className="text-gray-600 text-sm mb-4">{discription}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">{amount}</span>
         <PaymentButton/>
        </div>
      </div>
    </div>
  )
}

export default App