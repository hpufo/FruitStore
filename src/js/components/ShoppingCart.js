import React from 'react';
import csjs from 'react-csjs';
import { connect } from 'react-redux';
import { removeAllItems, deductFormStock } from '../actions/fruitActions';
import CartItem from './CartItem';

@csjs`
.shoppingCart{
  color: white;
  height: 100%;
  min-width: 350px;
  background-color: #32C996;
}
.shoppingHead{
  text-align: center;
}
.cartHeadLabel{
  margin-bottom: 0px;
  font-weight: 900;
}
.total{
  margin: 0px;
  display: block;
  text-align: right;
  font-weight: 900;
  font-size: 0.90em;
}
.emptyCartBtn{
  display: block;
  font-size: 0.67em;
  font-weight: 100;
  border: none;
  color: white;
  margin: 0px;
  padding: 0;
  cursor: pointer;
  background-color: transparent;
}
.purchaseBtn{
  width: 190px;
  height: 40px;
  color: black;
  border: none;
  cursor: pointer;
  font-weight: 900;
  font-size: medium;
  margin-top: 15px;
  margin-bottom: 25px;
  border-radius: 10px;
  background-color: #C0EFDF;
}
.cartBottom{
  float: right;
  margin-right: 15px;
}
.cartBottom > * {
  float: right;
  clear: right;
}
.shortLine{
  border: 0;
  height: 2px;
  background: white;
  margin-left: 30px;
}
.cartCount{
  margin: 0px 0px 5px 0px;
  font-weight: 100;
}
`
@connect((store) =>{
  return {
    fruits: store.fruits.fruits
  };
})
export default class ShoppingCart extends React.Component{
  /* Returns the cart items
  */
  getCartItems(){
    let {fruits} = this.props;
    return fruits.map((item,i) => {    //Loops through all the fruits
      if(item.inCart === true){                   //If in cart is true
        return <CartItem itemID={i} key={i} />    //Return a cart item with the itemID as a prop
      }
    });
  }
  /* Returns the number of items in the cart
  */
  getCartCount(){
    let count = 0;
    let {fruits, classes} = this.props;

    for(let i=0; i<fruits.length; i++)
      if(fruits[i].inCart)
        count++;
    
    return <h4 className={classes.cartCount}>{count} items</h4>;
  }
  /* Returns the total cost of the items in the cart
  */
  getTotalCost(){
    let sum = 0;
    let {fruits, classes} = this.props;

    for(let i=0; i<fruits.length; i++)                             //loops through the fruits arrat
      if(fruits[i].inCart){                                        //If the item is in the cart
        sum += fruits[i].price * fruits[i].quantity;    //Add the price times the quantity to the sum
      }
    
    return <label className={classes.total}>Total: ${sum.toFixed(2)}</label>
  }
  /* The purchase action which will clear the cart and deduce the stock
  */
  purchase = () => {
    let {fruits,dispatch} = this.props;
    for(let i=0; i<fruits.length; i++){
      if(fruits[i].inCart){
        dispatch(deductFormStock(fruits[i].id,fruits[i].quantity));  //For each item in the cart deduce it's quantity from the quantity remaining
      }
    }
    dispatch(removeAllItems());                                                            //Dispatch an action to remove all the items from the cart
  }
  /* Dispatches an action to remove all the items from the cart
  */
  clearCart = () => {
    this.props.dispatch(removeAllItems());
  }
  
  render(){
    let {classes} = this.props;
    return (
    <div className={classes.shoppingCart}>
      <div className={classes.shoppingHead}>
        <h2 className={classes.cartHeadLabel}>Shopping Cart</h2>
        {this.getCartCount()}
      </div>
      <div className={classes.cart}>
      {this.getCartItems()}
      </div>
      <hr className={classes.shortLine} />
      <div className={classes.cartBottom}>
        {this.getTotalCost()}
        <input type="button" value="Empty Cart" className={classes.emptyCartBtn} onClick={this.clearCart} />
        <input type="button" value="Confirm Purchase" className={classes.purchaseBtn} onClick={this.purchase} />
      </div>
    </div>
    );
  }
}