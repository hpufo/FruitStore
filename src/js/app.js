import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import Layout from "./components/Layout"
import store from "./store"
import thunk from 'redux-thunk';
import axios from 'axios';

const app = document.getElementById('app');

ReactDOM.render(<Provider store={store}>
  <Layout />
</Provider>, app);
/*
store.subscribe(() => {
  console.log("store changed", store.getState());
});//*/
/*
store.dispatch((dispatch) =>{
  dispatch({type: "FETCH_FRUITS_START"})
  
  axios.get("./store_items.json").then((response) => {
    dispatch({type: "RECEIVE_FRUITS", payload: response.data})
    /*dispatch({type: "DEDUCT", payload: {
      0: {
        "id": 0,
        "itemName": "banana",
        "deduct": 1
      },
      1: {
        "id": 1,
        "itemName": "apple",
        "deduct": 1
      },
      5: {
        "id": 5,
        "itemName": "strawberries",
        "deduct": 1
      }
    }
    })//*
  })
  .catch((err) => {
    dispatch({type: "FETCH_FRUITS_ERROR", payload: err})
  })
});//*/
/*
store.dispatch({type: "DEDUCT", payload: [
  {
    "itemName": "banana",
    "deduct": 1
  },
  {
    "itemName": "apple",
    "deduct": 1
  },
  {
    "itemName": "strawberries",
    "deduct": 1
  }
]});//*/