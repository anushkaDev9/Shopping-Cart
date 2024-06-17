import './App.css';
import Home from './Pages/Home';
import Cart from './Pages/Cart';
import Button from './Components/Button';
import axios from "axios";
import React from 'react';
import { useState } from 'react';
 const { Fragment, useEffect, useReducer } = React;
function App() {

  const[cart,setCart]=useState(false)
  const[cartItem,setCartItem]=useState([])
  const show=()=>{
setCart(true)

  }
   const products = [
     { name: "Apples", country: "Italy", cost: 3, instock: 10 },
     { name: "Oranges", country: "Spain", cost: 4, instock: 3 },
     { name: "Beans", country: "USA", cost: 2, instock: 5 },
     { name: "Cabbage", country: "USA", cost: 1, instock: 8 },
   ];
   const useDataApi = (initialUrl, initialData) => {
     const { useState, useEffect, useReducer } = React;
     const [url, setUrl] = useState(initialUrl);

     const [state, dispatch] = useReducer(dataFetchReducer, {
       isLoading: false,
       isError: false,
       data: initialData,
     });
     console.log(`useDataApi called`);
     useEffect(() => {
       console.log("useEffect Called");
       let didCancel = false;
       const fetchData = async () => {
         dispatch({ type: "FETCH_INIT" });
         try {
           const result = await axios(url);
           console.log("FETCH FROM URl");
           if (!didCancel) {
             dispatch({ type: "FETCH_SUCCESS", payload: result.data });
           }
         } catch (error) {
           if (!didCancel) {
             dispatch({ type: "FETCH_FAILURE" });
           }
         }
       };
       fetchData();
       return () => {
         didCancel = true;
       };
     }, [url]);
     return [state, setUrl];
   };
   const dataFetchReducer = (state, action) => {
     switch (action.type) {
       case "FETCH_INIT":
         return {
           ...state,
           isLoading: true,
           isError: false,
         };
       case "FETCH_SUCCESS":
         return {
           ...state,
           isLoading: false,
           isError: false,
           data: action.payload,
         };
       case "FETCH_FAILURE":
         return {
           ...state,
           isLoading: false,
           isError: true,
         };
       default:
         throw new Error();
     }
   };

 
   const [items,setItems]=useState(products)
   const count = 0;
  const addToCart = (name, price, quantity, country) => {
    if(quantity>0){
 let item = items.filter((item) => item.name === name);
 item[0].instock = item[0].instock - quantity;
 if(item[0].instock===0){
     alert("No stock ")
 }else{
  const itemObj = {
    name: name,
    price: price,
    quantity: quantity,
    country: country,
  };
  setCartItem([...cartItem, itemObj]);
 }

    }else{
      alert("Please entry quantity")
    }
    
  };
  
  const del=(i,quantity)=>{
      let item = cartItem.filter((item,index) =>  index!== i); 
       let target = cartItem.filter((item, index) => i== index);
       let newItems = items.map((item, index) => {
         if (item.name == target[0].name) item.instock = item.instock + quantity;
         return item;
       });
      setCartItem(item)
   setItems(newItems);
  } 
 
  
  const [query, setQuery] = useState("http://localhost:1337/api/products");
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "http://localhost:1337/api/products",
    {
      data: [],
    }
  );
  const [productNew, setProductNew] = useState([]);
  const restockProducts = () => {
  const url="http://localhost:1337/api/products"
  let item
    doFetch(url);

data.data.forEach((product) => {
  const attributes = product.attributes;
let name = attributes.Name;
let country = attributes.Country;
let cost = attributes.Cost;
let instock = attributes.InStock;
console.log(`${name}`)
item = {
  name: name,
  country: country,
  cost:cost,
  instock:instock
};
setProductNew(() => [...products, item]);

  
  // Access all attributes as an object (optional)
  console.log("All attributes:", attributes);
});
   setItems(products);
   setProductNew([])
   setCartItem([])
  };
  
  return (
    <div className="">
      <Button text="View Cart" className="show-btn" onClick={show} />
      <Button text="ReStock Products" className="show-btn" onClick={restockProducts} />
      <div className="App">
        <Home add={addToCart} products={products} items={items} count={count} />
        {cart && <Cart cartItem={cartItem} del={del} />}
      </div>
    </div>
  );
}

export default App;
