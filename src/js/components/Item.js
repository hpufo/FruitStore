import React from 'react';
import csjs from 'react-csjs';
import { connect } from 'react-redux';
import { addToCart, imgFailed } from '../actions/fruitActions';

@csjs`
.shopItem{
  display: inline-block;
  width: 250px;
  height: 340px;
  border: 1px solid #32C996;
  text-align: center;
  margin: 20px 20px 0px 0px;
}
.shopImg{
  height: 170px;
  width: 220px;
}
.fruitName{
  display: block;
  font-weight: bold;
  font-size: larger;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: capitalize;
 }
.price{
  font-size: -webkit-xxx-large;
}
.stock{
  font-size: larger;
}
.inStock{
  margin: 10px 0px 10px 0px;
  font-weight: 500;
}
.addToCartBtn{
  width: 190px;
  height: 40px;
  font-size: larger;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  background-color: #32C996;
}
`
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
  placeInCart = () => {
    if(this.props.fruit.quantityRemaining > 0)
      this.props.dispatch(addToCart(this.props.itemID));
  }
  
  /* Dispatches an action to use the placeholder image, if the image fails to load
  */
  usePlaceholder = () => {
    this.props.dispatch(imgFailed(this.props.itemID));
  }
  
  render(){
    let {fruit, classes} = this.props;    //Destructing the props object into fruit and classes
    return (
      <div className={classes.shopItem}>
        <img src={fruit.imgSrc} className={classes.shopImg} onError={this.usePlaceholder} />
        <label className={classes.fruitName}>{fruit.itemName}</label>
        <div className={classes.inStock}>
          <span className={classes.price}>${fruit.price} </span>
          <span className={classes.stock}>{fruit.quantityRemaining} in Stock</span>
        </div>
        <input type="button" value="Add to Cart" className={classes.addToCartBtn} onClick={this.placeInCart} />
      </div>
    );
  }
}