import React from 'react';
import { connect } from 'react-redux';
import Shop from './Shop';
import ShoppingCart from './ShoppingCart';

@connect((store) =>{
  return {
    error: store.fruits.error
  };
})
export default class Layout extends React.Component{
  render(){
    if(this.props.error != null)                //Error checking the JSON ajax call
      return <p>JSON file failed to load</p>;   //Print a simple error message
    else{                                       //Else return the layout    
      return (
        <div>
          <h1 id="tab">Fruit</h1>
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
}