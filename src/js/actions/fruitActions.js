import axios from 'axios';

export function fetchFruits(){
  return function(dispatch){
    axios.get("./store_items.json").then((response) => {
      dispatch({type: "RECEIVE_FRUITS", payload: response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_FRUITS_ERROR", payload: err})
    })
  }
}

export function addToCart(id){
  return {
    type: "ADD_TO_CART",
    payload: id
  }
}

export function removeItem(id){
  return {
    type: "REMOVE_ITEM",
    payload: id
  }
}

export function removeAllItems(){
  return {
    type: "REMOVE_ALL_ITEMS"
  }
}

export function incrementquantity(id){
  return {
    type: "INCREMENT_quantity",
    payload: id,
  }
}

export function decrementquantity(id){
  return {
    type: "DECREMENT_quantity",
    payload: id
  }
}

export function deductFormStock(id, quantity){
  return {
    type: "DEDUCT_FROM_STOCK",
    payload: {"id": id,"quantity": quantity}
  }
}