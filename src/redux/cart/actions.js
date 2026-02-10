import CartActionTypes from "./action-types";

export const addProductToCart = (payload) => ({
  type: CartActionTypes.ADD_PRODUCT,
  payload,
});

export const removeProductFromCart = (payload) => ({
  type: CartActionTypes.REMOVE_PRODUCT,
  payload,
});

export const increaseProductOnCart = (payload) => ({
  type: CartActionTypes.INCREASE_PRODUCT,
  payload,
})

export const decreaseProductOnCart = (payload) => ({
  type: CartActionTypes.DECREASE_PRODUCT,
  payload,
})
