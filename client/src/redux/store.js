import { combineReducers, configureStore } from '@reduxjs/toolkit';

import products from './slices/products';
import cart from './slices/cart';
import user from './slices/user';
import order from './slices/order';
import admin from './slices/admin';

const reducer = combineReducers({
  products,
  cart,
  user,
  order,
  admin,
});

export default configureStore({
  reducer,
});
