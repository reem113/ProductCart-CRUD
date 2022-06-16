import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import cartReducer from "./Redux/cartSlice"
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Redux/productsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer

  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
