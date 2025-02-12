// filepath: /d:/Programming Repos/MyanTech ERP/frontend/src/store.js
import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/userReducer";
import ordersReducer from "./reducers/orderReducer";
import customersReducer from "./reducers/customerReducer";
import warehouseOrdersReducer from "./reducers/warehouseOrdersReducer";
import driversReducer from "./reducers/driverReducer";
import trucksReducer from "./reducers/truckReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  orders: ordersReducer,
  customers: customersReducer,
  warehouseOrders: warehouseOrdersReducer,
  drivers: driversReducer,
  trucks: trucksReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
