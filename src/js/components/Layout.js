import React from 'react';
import csjs from 'react-csjs';
import { connect } from 'react-redux';
import Shop from './Shop';
import ShoppingCart from './ShoppingCart';

@csjs`
.tab{
  background-color: #32C996;
  color: white;
  width: 210px;
  font-family: sans-serif;
  margin-bottom: 0px;
  margin-left: calc(50% - 725px);
  text-align: center;
}
@media screen and (max-width: 1470px) {
  .tab{ 
    margin-left: 0px;
  }
}
.container{
  border-top: 5px solid #32C996;
  width: 100%;
  height: calc(100% - 42px);
}
.mainContent{
  width: 50%;
  margin: 0 auto;
  min-width: 1450px;
  height: 100%;
  display: flex;
}
`
@connect((store) =>{
  return {
    error: store.fruits.error
  };
})
export default class Layout extends React.Component{
  render(){
    if(this.props.error != null)                //Error checking the JSON ajax call
      return <p>JSON file failed to load</p>;   //Print a simple error message
    else{                                       //Else return the layout    
      let {classes} = this.props;
      return (
        <div className={classes.layout}>
          <h1 className={classes.tab}>Fruit</h1>
          <div className={classes.container}>
            <div className={classes.mainContent}>
              <Shop />
              <ShoppingCart />
            </div>
          </div>
        </div>
      );
    }
  }
}