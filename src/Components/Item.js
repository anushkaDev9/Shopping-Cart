import React, { useReducer, useState } from 'react'
import './Item.css'
import Apples from "../Components/apple.png";
import Oranges from "../Components/orange.png";
import Cabbage from "../Components/cabbage.png";
import beans from "../Components/beans.png";
import Button from './Button';
const reducer=(state,action)=>{
  switch (action.type) {
    case "Increment":
      return {
        ...state,
        count: state.count+1,
      };
    case "Decrement":
      return {
        ...state,
        count: state.count-1,
      };
  }
}

const Item = (props) => {

const [state,dispatch]=useReducer(reducer,{count:0})
  return (
    <div className="div-item">
      {props.name === "Apples" && <img src={Apples} alt={props.name} />}
      {props.name === "Oranges" && <img src={Oranges} alt={props.name} />}
      {props.name === "Cabbage" && <img src={Cabbage} alt={props.name} />}
      {props.name === "Beans" && <img src={beans} alt={props.name} />}
      <p className="p-name">{props.name}</p>
      <p className="p-price">${props.price}</p>
      <p className="p-qauntity">In stock{props.qauntity}</p>

      <Button
        text="-"
        className="btn"
        onClick={() => {
          dispatch({ type: "Decrement" });
        }}
      />
      {state.count >= 0 ? state.count : 0}
      <Button
        text="+"
        className="btn"
        onClick={() => {
          dispatch({ type: "Increment" });
        }}
      />
      <br />

      <Button
        text="Add to cart"
        className="cart-btn"
        onClick={() => {
          props.add(
            props.name,
            props.price * state.count,
            state.count,
            props.country
          );
        }}
      />
    </div>
  );
}

export default Item
