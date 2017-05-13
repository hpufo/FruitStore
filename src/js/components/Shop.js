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
  componentWillMount(){
    this.props.dispatch(fetchFruits());
  }
  
  renderItems(){
    return this.props.fruits.map((item,i) => {
       return <Item itemID={item.id} key={i} />
    });
  }
  
  render(){
    return(
      <div id="shop">
        {this.renderItems()}
      </div>
    )
  }
}