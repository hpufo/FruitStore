import React from 'react';
import { connect } from 'react-redux';
import { removeAllItems, deductFormStock } from '../actions/fruitActions';
import CartItem from './CartItem';

@connect((store) =>{
  return {
    fruits: store.fruits.fruits
  };
})
export default class ShoppingCart extends React.Component{
  /* Returns the cart items
  */
  getCartItems(){
    return this.props.fruits.map((item,i) => {    //Loops through all the fruits
      if(item.inCart === true){                   //If in cart is true
        return <CartItem itemID={i} key={i} />    //Return a cart item with the itemID as a prop
      }
    });
  }
  /* Returns the number of items in the cart
  */
  getCartCount(){
    let count = 0;
    
    for(let i=0; i<this.props.fruits.length; i++)
      if(this.props.fruits[i].inCart)
        count++;
    
    return <h4 id="cartCount">{count} items</h4>;
  }
  /* Returns the total cost of the items in the cart
  */
  getTotalCost(){
    let sum = 0;
    
    for(let i=0; i<this.props.fruits.length; i++)                             //loops through the fruits arrat
      if(this.props.fruits[i].inCart){                                        //If the item is in the cart
        sum += this.props.fruits[i].price * this.props.fruits[i].quantity;    //Add the price times the quantity to the sum
      }
    
    return <label id="total">Total: ${sum.toFixed(2)}</label>
  }
  /* The purchase action which will clear the cart and deduce the stock
  */
  purchase(){
    for(let i=0; i<this.props.fruits.length; i++){
      if(this.props.fruits[i].inCart){
        this.props.dispatch(deductFormStock(this.props.fruits[i].id,this.props.fruits[i].quantity));  //For each item in the cart deduce it's quantity from the quantity remaining
      }
    }
    this.props.dispatch(removeAllItems());                                                            //Dispatch an action to remove all the items from the cart
  }
  /* Dispatches an action to remove all the items from the cart
  */
  clearCart(){
    this.props.dispatch(removeAllItems());
  }
  
  render(){
    return (
    <div id="shoppingCart">
      <div id="shoppingHead">
        <h2 id="cartHeadLabel">Shopping Cart</h2>
        {this.getCartCount()}
      </div>
      <div id="cart">
      {this.getCartItems()}
      </div>
      <hr id="shortLine" />
      <div id="cartBottom">
        {this.getTotalCost()}
        <input type="button" value="Empty Cart" id="emptyCartBtn" onClick={this.clearCart.bind(this)} />
        <input type="button" value="Confirm Purchase" id="purchaseBtn" onClick={this.purchase.bind(this)} />
      </div>
    </div>
    );
  }
}