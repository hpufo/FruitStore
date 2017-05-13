import React from 'react';
import Shop from './Shop';
import ShoppingCart from './ShoppingCart';

export default class Layout extends React.Component{
  render(){
    return (
    <div>
      <h1>Fruit</h1>
      <div id="container">
        <div id="mainContent">
          <Shop />
          <ShoppingCart />
        </div>
      </div>
    </div>
    );
  }
}