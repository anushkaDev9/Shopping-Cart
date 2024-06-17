import React from 'react'
import './Cart.css'
import Button from '../Components/Button';
const Cart = (props) => {
  return (
    <div className="div-cart">
      <h2>Cart Items</h2>
      <ul className="cart-div">
        <li>name</li>
        <li>price</li>
        <li>qauntity</li>
        <li>country</li>
      </ul>
<br/>
      <div>
        {props.cartItem.map((item,i) => {
          return (
            <div>
              <ul className="cart-ul">
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.quantity}</li>
                <li>{item.country}</li>
                <Button
                  text="Del"
                  className="btn"
                  onClick={() => props.del(i, item.quantity)}
                />
                <br />
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart
