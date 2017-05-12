import React from 'react';
import { connect } from 'react-redux';
import { fetchFruits } from '../actions/fruitActions';
import Item from './Item';
import ShoppingCart from './ShoppingCart';

@connect((store) =>{
  return {
    fruits: store.fruits.fruits
  };
})
export default class Layout extends React.Component{
  componentWillMount(){
    this.props.dispatch(fetchFruits());
  }
  
  renderItems(){
    //should put div=shop into it's own conponent
    return this.props.fruits.map((item,i) => {
       //return <Item item={{item} key={i} />
       return <Item itemID={item.id} key={i} />
    });
  }
  
  render(){
    //console.log(this.props.fruits);
    return (
    <div>
      <h1>Fruit</h1>
      <div id="container">
        <div id="mainContent">
          <div id="shop">
            {this.renderItems()}
          </div>
          <ShoppingCart />
        </div>
      </div>
    </div>
    );
  }
}