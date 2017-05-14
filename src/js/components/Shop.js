import React from 'react';
import { connect } from 'react-redux';
import Item from './Item';
import { fetchFruits } from '../actions/fruitActions';

@connect((store) =>{
  return {
    fruits: store.fruits.fruits
  };
})
export default class Shop extends React.Component{
  /* Dispatch an action to get the fruits from the JSON file before this component is rendered
  */
  componentWillMount(){
    this.props.dispatch(fetchFruits());
  }
  
  renderItems(){
    if(this.props.fruits.length == 0)                                     //If the fruits array is empty
      return <img src="./emptyShop.jpg" alt="fruits array was empty" />   //Show a pic of an empty store
    else{                                                                 //Else return all of the items in the fruits array
      return this.props.fruits.map((item,i) => {
         return <Item itemID={item.id} key={i} />
      });
    }
  }
  
  render(){
    return(
      <div id="shop">
        {this.renderItems()}
      </div>
    )
  }
}