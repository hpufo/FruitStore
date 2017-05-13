import React from 'react';
import { connect } from 'react-redux';
import { removeItem, incrementquantity, decrementquantity, imgFailed } from '../actions/fruitActions';

@connect((store, ownProps) =>{
  return {
    fruit: store.fruits.fruits[ownProps.itemID]
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
  
  usePlaceholder(){
    this.props.dispatch(imgFailed(this.props.itemID));
  }
  
  render(){
    return (
    <div className="cartItem">
      <div className="topHalf">
        <img src={this.props.fruit.imgSrc} className="cartImg" width="80" height="60" onError={this.usePlaceholder.bind(this)} />
        <div className="quantity">
          <input type="button" value="-" className="countBtn" onClick={this.decrement.bind(this)} />
          <label className="count">{this.props.fruit.quantity}</label>
          <input type="button" value="+" className="countBtn" onClick={this.increment.bind(this)} />
        </div>
      </div>
      <div className="bottomHalf">
        <label>@ ${this.props.fruit.price}each = ${(this.props.fruit.price * this.props.fruit.quantity).toFixed(2)}</label>
        <input type="button" value="Delete" className="deleteBtn" onClick={this.removeFromCart.bind(this)} />
      </div>
    </div>
    );
  }
}