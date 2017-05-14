const initialState = {
  fetching: false,
  fetched: false,
  fruits: [],
  error: null
};
/*This is the function that changes the state. It will receive an action and take actions based on it
* @state: The entire application state(In this case since there is only 1 reducer).
* @action: The object dispatched from the action creators 
*/
export default function fruitsReducer(state = initialState, action){
  switch(action.type){
    case "FETCH_FRUITS_START":{
      return {...state, fetching: true};
    }
    case "ADD_TO_CART": {
      return Object.assign({},state,{                       //Returns the modified state in a new object
        fruits: state.fruits.map((fruit, index) => {        //For the fruits array in the state, apply this function to each element
          if(index === action.payload){                     //If the index matches the id from the action payload
            return Object.assign({}, fruit, {               //Return the modified fruit from the fruits array in a new object
              inCart: true                                  //Setting inCart to true  
            })
          }
          return fruit                                      //If the index didn't match with the action payload return the unmodified fruit from the fruits array
        })
      });
    }
    case "REMOVE_ITEM": {
      return Object.assign({},state,{                       //Same logic as above
        fruits: state.fruits.map((fruit, index) => {
          if(index === action.payload){
            return Object.assign({}, fruit, {
              inCart: false,                                //Set inCart to false instead
              quantity: 0                                   //Set the quantity to zero as well
            })
          }
          return fruit
        })
      });
    }
    case "REMOVE_ALL_ITEMS":{
      return Object.assign({},state,{                       //Returns a new object containing the updated state
        fruits: state.fruits.map((fruit) => {               //For each element in the State.fruits array apply this function on it
          return Object.assign({}, fruit, {                 //Return a new object with the updated fruit element
            inCart: false,                                  //Set inCart to false
            quantity: 0                                     //Set the quantity to zero as well
          })
        })
      });
    }
    case "INCREMENT_QUANTITY":{
      return Object.assign({},state,{                       //Returns a new object containing the updated state
        fruits: state.fruits.map((fruit, index) => {        //For each element in the State.fruits array apply this function to it
          if(index === action.payload){                     //If the fruit's id matches the one from the action payload
            let quantity = fruit.quantity;                  //scoped quantity varible 
            if(quantity < fruit.quantityRemaining)          //If the quantity is less than the remainig quantity
              quantity++;                                   //Increament it
            return Object.assign({}, fruit, {               //Returns a new object containing the updated fruit element
              quantity: quantity                            //Setting the new quantity
            })
          }
          return fruit                                      //Returns all the unmodified fruit elements
        })
      });
    }
    case "DECREMENT_QUANTITY":{
      return Object.assign({},state,{                       //Same as above
        fruits: state.fruits.map((fruit, index) => {
          if(index === action.payload){
            let quantity = fruit.quantity;
            if(quantity > 0)                                //If the quantity is greater than zero
              quantity--;                                   //decrement it
            return Object.assign({}, fruit, {
              quantity: quantity
            })
          }
          return fruit
        })
      });
    }
    case "DEDUCT_FROM_STOCK":{
      return Object.assign({},state,{                                                   //Returns a new object containing the updated state
        fruits: state.fruits.map((fruit, index) => {                                    //For each element in the State.fruits array apply this function to it
          if(index === action.payload.id){                                              //If the fruit's id matches the one from the action payload
            return Object.assign({}, fruit, {                                           //Returns a new object containing the updated fruit element
              quantityRemaining: fruit.quantityRemaining - action.payload.quantity,     //Update the remaining quantity
              quantity: 0                                                               //Set the quantity to 0
            })
          }
          return fruit                                                                  //Return the unmodified fruit
        })
      });
    }
    case "RECEIVE_FRUITS":{
      const fruits = action.payload.map((item, id)=>{                                   //Appending extra data to the fruits array from the JSON response
        item["id"] = id;                                                                //ID of the fruit
        item["inCart"] = false;                                                         //Boolean to tell if it is in the cart
        item["quantity"] = 0;                                                           //How much the user wants
        return item;                                                                    //Returning the new fruit item.
      });
      
      return {                                                                          //Updates the state with the new state
        ...state, 
        fetching: false, 
        fetched: true, 
        fruits: fruits
      };
    }
    case "IMG_FAILED_TO_LOAD":{
      return Object.assign({},state,{                                                   //Returns a new object containing the updated state
        fruits: state.fruits.map((fruit, index) => {                                    //For each element in the State.fruits array apply this function to it
          if(index === action.payload){                                                 //If the fruit's id matches the one from the action payload
            return Object.assign({}, fruit, {                                           //Returns a new object containing the updated fruit element
              imgSrc: "/images/no-image.png"                                                  //changes the imgSrc to be the placeholder image
            })
          }
          return fruit                                                                  //Return the unmodified fruits
        })
      });
    }
    case "FETCH_FRUITS_ERROR":{
     return {...state, fetching: false, error: action.payload};                       //If there was a problem getting the JSON response 
    }
    default:
      return state;                                                //Not doing anything so just return the state unmodified
  }
}