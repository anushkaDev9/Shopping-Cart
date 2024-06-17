import React, { useState } from 'react'
import './Home.css'
import Item from '../Components/Item'

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
const Home = (props) => {
    const products = [
      { name: "Apples_:", country: "Italy", cost: 3, instock: 10 },
      { name: "Oranges:", country: "Spain", cost: 4, instock: 3 },
      { name: "Beans__:", country: "USA", cost: 2, instock: 5 },
      { name: "Cabbage:", country: "USA", cost: 1, instock: 8 },
    ];
    const items=props.items
   const count= props.count;
  return (
    <div className="div-home">
        {items.map((item)=>{
        return (
          <div>
            <Item
              img={item.name}
              name={item.name}
              price={item.cost}
              qauntity={item.instock}
              country={item.country}
              add={props.add}
              count={count}
            />
          </div>
        );
        })}
      
      
    </div>
  );
}

export default Home
