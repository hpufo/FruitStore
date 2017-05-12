const exampleState = {
  fruits: [
    {
      "itemName": "banana",
      "imgSrc": "https://tinyurl.com/zcdrymz",
      "price": 1.25,
      "quantityRemaining": 10
    },
    {
      "itemName": "apple",
      "imgSrc": "https://tinyurl.com/lg5rj5z",
      "price": 2.50,
      "quantityRemaining": 5
    },
    {
      "itemName": "raspberry",
      "imgSrc": "https://tinyurl.com/mhoedwl",
      "price": 4.00,
      "quantityRemaining": 2
    },
    {
      "itemName": "kiwi",
      "imgSrc": "https://tinyurl.com/mdm9kho",
      "price": 3.33,
      "quantityRemaining": 15
    },
    {
      "itemName": "very delicious pineapple with a long name",
      "imgSrc": "https://tinyurl.com/k2oq2to",
      "price": 4.75,
      "quantityRemaining": 1
    },
    {
      "itemName": "strawberries",
      "imgSrc": "https://tinyurl.com/nyy33hf",
      "price": 2.05,
      "quantityRemaining": 3
    }
  ]
};

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
      //Maybe try to reuse function from above?
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
    case "INCREMENT_QUANITY":{
      return Object.assign({},state,{
        fruits: state.fruits.map((fruit, index) => {
          if(index === action.payload){
            let quanity = fruit.quanity;
            if(quanity < fruit.quantityRemaining)
              quanity++;
            return Object.assign({}, fruit, {
              quanity: quanity
            })
          }
          return fruit
        })
      });
      break;
    }
    case "DECREMENT_QUANITY":{
      return Object.assign({},state,{
        fruits: state.fruits.map((fruit, index) => {
          if(index === action.payload){
            let quanity = fruit.quanity;
            if(quanity > 0)
              quanity--;
            return Object.assign({}, fruit, {
              quanity: quanity
            })
          }
          return fruit
        })
      });
      break;
    }
    case "DEDUCT_FROM_STOCK":{
      //console.log(action.payload);
      return state;
      break;
    }
    case "RECEIVE_FRUITS":{
      //Appending extra data to the fruits array
      const fruits = action.payload.map((item, id)=>{
        item["id"] = id;
        item["inCart"] = false;
        item["quanity"] = 0;
        return item;
      });
      return {...state, fetching: false, fetched: true, fruits: fruits};
      break;
    }
    case "FETCH_FRUITS_ERROR":{
     return {...state, fetching: false, error: action.payload};
    }
    default:
      return state;
  }
}

//export default fruitsReducer;