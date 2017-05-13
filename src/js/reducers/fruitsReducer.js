const initialState = {
  fetching: false,
  fetched: false,
  fruits: [],
  error: null
};

export default function fruitsReducer(state = initialState, action){
  switch(action.type){
    case "FETCH_FRUITS_START":{
      return {...state, fetching: true};
      break;
    }
    case "ADD_TO_CART": {
      return Object.assign({},state,{
        fruits: state.fruits.map((fruit, index) => {
          if(index === action.payload){
            return Object.assign({}, fruit, {
              inCart: true
            })
          }
          return fruit
        })
      });
      break;
    }
    case "REMOVE_ITEM": {
      return Object.assign({},state,{
        fruits: state.fruits.map((fruit, index) => {
          if(index === action.payload){
            return Object.assign({}, fruit, {
              inCart: false
            })
          }
          return fruit
        })
      });
      break;
    }
    case "REMOVE_ALL_ITEMS":{
      return Object.assign({},state,{
        fruits: state.fruits.map((fruit) => {
          return Object.assign({}, fruit, {
            inCart: false
          })
          return fruit
        })
      });
      break;
    }
    case "INCREMENT_QUANTITY":{
      return Object.assign({},state,{
        fruits: state.fruits.map((fruit, index) => {
          if(index === action.payload){
            let quantity = fruit.quantity;
            if(quantity < fruit.quantityRemaining)
              quantity++;
            return Object.assign({}, fruit, {
              quantity: quantity
            })
          }
          return fruit
        })
      });
      break;
    }
    case "DECREMENT_QUANTITY":{
      return Object.assign({},state,{
        fruits: state.fruits.map((fruit, index) => {
          if(index === action.payload){
            let quantity = fruit.quantity;
            if(quantity > 0)
              quantity--;
            return Object.assign({}, fruit, {
              quantity: quantity
            })
          }
          return fruit
        })
      });
      break;
    }
    case "DEDUCT_FROM_STOCK":{
      
      return Object.assign({},state,{
        fruits: state.fruits.map((fruit, index) => {
          if(index === action.payload.id){
            return Object.assign({}, fruit, {
              quantityRemaining: fruit.quantityRemaining - action.payload.quantity,
              quantity: 0
            })
          }
          return fruit
        })
      });
      break;
    }
    case "RECEIVE_FRUITS":{
      //Appending extra data to the fruits array
      const fruits = action.payload.map((item, id)=>{
        item["id"] = id;
        item["inCart"] = false;
        item["quantity"] = 0;
        return item;
      });
      return {...state, fetching: false, fetched: true, fruits: fruits};
      break;
    }
    case "IMG_FAILED_TO_LOAD":{
      return Object.assign({},state,{
        fruits: state.fruits.map((fruit, index) => {
          if(index === action.payload){
            return Object.assign({}, fruit, {
              imgSrc: "./no-image.png"
            })
          }
          return fruit
        })
      });
    }
    case "FETCH_FRUITS_ERROR":{
     return {...state, fetching: false, error: action.payload};
    }
    default:
      return state;
  }
}