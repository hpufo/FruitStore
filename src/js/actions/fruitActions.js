import axios from 'axios';

/* Gets the JSON from the file, then dispatches an action create for the reducer to update the state. 
*/
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
/* Creates an action to add a fruit to the cart
*/
export function addToCart(id){
  return {
    type: "ADD_TO_CART",
    payload: id
  }
}
/*  Creates an action to remove one item from the cart
*/
export function removeItem(id){
  return {
    type: "REMOVE_ITEM",
    payload: id
  }
}
/*  Creates an action to remove all the items from the cart
*/
export function removeAllItems(){
  return {
    type: "REMOVE_ALL_ITEMS"
  }
}
/*  Creates an action to increment the quantity of one fruit
*/
export function incrementquantity(id){
  return {
    type: "INCREMENT_QUANTITY",
    payload: id,
  }
}
/*  Creates an action to decrement the quantity of one fruit
*/
export function decrementquantity(id){
  return {
    type: "DECREMENT_QUANTITY",
    payload: id
  }
}
/*  Creates an action to decduct the quantity of a fruit
*/
export function deductFormStock(id, quantity){
  return {
    type: "DEDUCT_FROM_STOCK",
    payload: {"id": id,"quantity": quantity}
  }
}
/*  Creates an action that the fruit's image failed to load
*/
export function imgFailed(id){
  return {
    type: "IMG_FAILED_TO_LOAD",
    payload: id
  }
}