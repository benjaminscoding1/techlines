import axios from 'axios';
import { setLoading, setError, cartItemAdd, cartItemRemoval, setExpressShipping, clearCart } from '../slices/cart';

export const addCartItem = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    const itemToAdd = {
      id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      qty,
    };
    dispatch(cartItemAdd(itemToAdd));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
  }
};

export const removeCartItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(cartItemRemoval(id));
};

export const setExpress = (value) => async (dispatch) => {
  dispatch(setExpressShipping(value));
};

export const resetCart = () => (dispatch) => {
  dispatch(clearCart());
};
