import { combineReducers, configureStore } from '@reduxjs/toolkit';

import products from './slices/products';
import cart from './slices/cart';
import user from './slices/user';

const reducer = combineReducers({
  products,
  cart,
  user,
});

export default configureStore({
  reducer,
});
