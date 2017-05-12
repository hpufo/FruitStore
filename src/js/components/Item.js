import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/fruitActions';

@connect((store) =>{
  return {
    fruits: store.fruits.fruits
  };
})
export default class Item extends React.Component{
  placeInCart(){
    this.props.dispatch(addToCart(this.props.itemID));
  }
  
  render(){
    return (
      <div className="ShopItem">
        <img src={this.props.fruits[this.props.itemID].imgSrc} className="shopImg" />
        <label className="fruitName">{this.props.fruits[this.props.itemID].itemName}</label>
        <div className="inStock">
          <span className="price">${this.props.fruits[this.props.itemID].price}</span>
          <span className="stock">{this.props.fruits[this.props.itemID].quantityRemaining} in Stock</span>
        </div>
        <input type="button" value="Add to Cart" className="addToCartBtn" onClick={this.placeInCart.bind(this)} />
      </div>
    );
  }
}