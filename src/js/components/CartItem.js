import React from 'react';
import { connect } from 'react-redux';
import { removeItem, incrementquantity, decrementquantity, imgFailed } from '../actions/fruitActions';

/*  Connects the store's state to this component
*   @store: the entire state is in here. 
*   @ownProps: Access to the props
*/
@connect((store, ownProps) =>{
  return {
    fruit: store.fruits.fruits[ownProps.itemID]             //Gets the fruit
  };
})
export default class CartItem extends React.Component{
  /* Dispatches an action to increase the quantity by 1
  */
  increment(){
    this.props.dispatch(incrementquantity(this.props.itemID));
  }
  /* Dispatches an action to decrease the quantity by 1
  */
  decrement(){
    this.props.dispatch(decrementquantity(this.props.itemID));
  }
  /* Dispatches an action to remove this item from the cart
  */
  removeFromCart(){
    this.props.dispatch(removeItem(this.props.itemID));
  }
  /* Dispatches an action to use a placeholder image if this image fails to load
  */
  usePlaceholder(){
    this.props.dispatch(imgFailed(this.props.itemID));
  }
  
  render(){
    return (
    <div className="cartItem">
      <div className="topHalf">
        <img src={this.props.fruit.imgSrc} className="cartImg" onError={this.usePlaceholder.bind(this)} />
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