import React from 'react';
import { connect } from 'react-redux';
import { addToCart, imgFailed } from '../actions/fruitActions';

/*  Connects the store's state to this component
*   @store: the entire state is in here. 
*   @ownProps: Access to the props
*/
@connect((store, ownProps) =>{
  return {
    fruit: store.fruits.fruits[ownProps.itemID]       //Gets the fruit
  };
})
export default class Item extends React.Component{
  /* Place the item in the cart by dispatching an action.
  */
  placeInCart(){
    if(this.props.fruit.quantityRemaining > 0)
      this.props.dispatch(addToCart(this.props.itemID));
  }
  
  /* Dispatches an action to use the placeholder image, if the image fails to load
  */
  usePlaceholder(){
    this.props.dispatch(imgFailed(this.props.itemID));
  }
  
  render(){
    return (
      <div className="ShopItem">
        <img src={this.props.fruit.imgSrc} className="shopImg" onError={this.usePlaceholder.bind(this)} />
        <label className="fruitName">{this.props.fruit.itemName}</label>
        <div className="inStock">
          <span className="price">${this.props.fruit.price} </span>
          <span className="stock">{this.props.fruit.quantityRemaining} in Stock</span>
        </div>
        <input type="button" value="Add to Cart" className="addToCartBtn" onClick={this.placeInCart.bind(this)} />
      </div>
    );
  }
}