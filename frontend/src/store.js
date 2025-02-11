// filepath: /d:/Programming Repos/MyanTech ERP/frontend/src/store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/userReducer";
import ordersReducer from "./reducers/orderReducer";
import customersReducer from "./reducers/customerReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  orders: ordersReducer,
  customers: customersReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
