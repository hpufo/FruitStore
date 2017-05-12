import React from 'react';
import { connect } from 'react-redux';

@connect((store) =>{
  return {
    fruits: store.fruits.fruits
  };
})
export default class CartCount extends React.Component{
  render(){
    let count = 0;
    
    for(var fruit in this.props.fruits){
      if(fruit.inCart) 
        count++;
    }
    
    return <h4>{count} items</h4>;
  }
}