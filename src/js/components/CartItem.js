import React from 'react';
import csjs from 'react-csjs';
import { connect } from 'react-redux';
import { removeItem, incrementquantity, decrementquantity, imgFailed } from '../actions/fruitActions';

@csjs`
.cartItem{
  height: 85px;
  background-color: #6FD9B5;
  margin-bottom: 15px;
  padding: 10px 10px 10px 25px;
}
.cartImg{
  width: 80px;
  height: 60px;
  display: inline-block;
}
.quantity{
  position: relative;
  bottom: 12px;
  display: inline-block;
}
.count{
  color: black;
  font-size: x-large;
}
.countBtn{
  font-size: large;
  padding-top: 0px;
  padding-bottom: 0px;
  border-color: transparent;
  cursor: pointer;
  border-style: none;
  background-color: white;
  margin-left: 10px;
  margin-right: 10px;
}
.bottomHalf{
  color: black;
}
.bottomHalfLabel{
  font-size: small;
  font-weight: 800;
}
.deleteBtn{
  border: 0;
  color: white;
  float: right;
  cursor: pointer;
  font-size: medium;
  background-color: transparent;
}
`
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
  increment = () => {
    this.props.dispatch(incrementquantity(this.props.itemID));
  }
  /* Dispatches an action to decrease the quantity by 1
  */
  decrement = () => {
    this.props.dispatch(decrementquantity(this.props.itemID));
  }
  /* Dispatches an action to remove this item from the cart
  */
  removeFromCart = () => {
    this.props.dispatch(removeItem(this.props.itemID));
  }
  /* Dispatches an action to use a placeholder image if this image fails to load
  */
  usePlaceholder = () => {
    this.props.dispatch(imgFailed(this.props.itemID));
  }
  
  render(){
    let {fruit, classes} = this.props;    //Destructing the props object into fruit and classes
    return (
    <div className={classes.cartItem}>
      <div className={classes.topHalf}>
        <img src={fruit.imgSrc} className={classes.cartImg} onError={this.usePlaceholder} />
        <div className={classes.quantity}>
          <input type="button" value="-" className={classes.countBtn} onClick={this.decrement} />
          <label className={classes.count}>{fruit.quantity}</label>
          <input type="button" value="+" className={classes.countBtn} onClick={this.increment} />
        </div>
      </div>
      <div className={classes.bottomHalf}>
        <label className={classes.bottomHalfLabel}>
          @ ${fruit.price}each = ${(fruit.price * fruit.quantity).toFixed(2)}
        </label>
        <input type="button" value="Delete" className={classes.deleteBtn} onClick={this.removeFromCart} />
      </div>
    </div>
    );
  }
}