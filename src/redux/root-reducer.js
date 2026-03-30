import { combineReducers } from "redux";

import userReducer from "./user/slice";
import cartReducer from "./cart/slice";
import imagePreviewReducer from "./image-preview/slice";

const rootReducer = combineReducers({
  userReducer,
  cartReducer,
  imagePreview: imagePreviewReducer,
});

export default rootReducer;
