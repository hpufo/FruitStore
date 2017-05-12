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
  getCartItems(){
    return this.props.fruits.map((item,i) => {
      if(item.inCart === true){
        return <CartItem itemID={i} key={i} />
      }
    });
  }
  //Maybe move to another componenet
  getCartCount(){
    let count = 0;
    
    for(let i=0; i<this.props.fruits.length; i++)
      if(this.props.fruits[i].inCart) 
        count++;
    
    return <h4>{count} items</h4>;
  }
  //Same as above
  getTotalCost(){
    let sum = 0;
    
    for(let i=0; i<this.props.fruits.length; i++)
      if(this.props.fruits[i].inCart){
        sum += this.props.fruits[i].price * this.props.fruits[i].quanity;
      }
    
    return <label id="total">Total: ${sum}</label>
  }
  
  purchase(){
    let obj = [];
    
    for(var fruit in this.props.fruits){
      console.log(fruit.id);
      if(fruit.inCart){
        obj.push(fruit.id);
      }
    }
    //console.log(obj);
    this.props.dispatch(deductFormStock(obj));
    this.props.dispatch(removeAllItems());
  }
  
  clearCart(){
    this.props.dispatch(removeAllItems());
  }
  
  render(){
    return (
    <div id="shoppingCart">
      <div id="shoppingHead">
        <h2>Shopping Cart</h2>
        {this.getCartCount()}
      </div>
      <div id="cart">
      {this.getCartItems()}
      </div>
      <hr />
      <div id="cartBottom">
        {this.getTotalCost()}
        <input type="button" value="Empty Cart" id="emptyCartBtn" onClick={this.clearCart.bind(this)} />
        <input type="button" value="Confirm Purchase" id="purchaseBtn" onClick={this.purchase.bind(this)} />
      </div>
    </div>
    );
  }
}