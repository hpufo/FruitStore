import React from 'react';
import { connect } from 'react-redux';
import { removeItem, incrementquantity, decrementquantity } from '../actions/fruitActions';

@connect((store) =>{
  return {
    fruits: store.fruits.fruits
  };
})
export default class CartItem extends React.Component{
  increment(){
    this.props.dispatch(incrementquantity(this.props.itemID));
  }
  
  decrement(){
    this.props.dispatch(decrementquantity(this.props.itemID));
  }
  
  removeFromCart(){
    this.props.dispatch(removeItem(this.props.itemID));
  }
  
  render(){
    return (
    <div className="cartItem">
      <div className="topHalf">
        <img src={this.props.fruits[this.props.itemID].imgSrc} className="cartImg" width="80" height="60" />
        <div className="quantity">
          <input type="button" value="-" className="countBtn" onClick={this.decrement.bind(this)} />
          <label className="count">{this.props.fruits[this.props.itemID].quantity}</label>
          <input type="button" value="+" className="countBtn" onClick={this.increment.bind(this)} />
        </div>
      </div>
      <div className="bottomHalf">
        <label>@ ${this.props.fruits[this.props.itemID].price}each = ${this.props.fruits[this.props.itemID].price * this.props.fruits[this.props.itemID].quantity}</label>
        <input type="button" value="Delete" className="deleteBtn" onClick={this.removeFromCart.bind(this)} />
      </div>
    </div>
    );
  }
}