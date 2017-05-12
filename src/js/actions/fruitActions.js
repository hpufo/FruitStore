import axios from 'axios';

export function fetchFruits(){
  return function(dispatch){
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
    })//*/
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

export function incrementQuanity(id){
  return {
    type: "INCREMENT_QUANITY",
    payload: id,
  }
}

export function decrementQuanity(id){
  return {
    type: "DECREMENT_QUANITY",
    payload: id
  }
}

export function deductFormStock(id, quanity){
  return {
    type: "DEDUCT_FROM_STOCK",
    payload: {"id": id,"quanity": quanity}
  }
}