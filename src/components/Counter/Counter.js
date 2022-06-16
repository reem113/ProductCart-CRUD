import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { updateCart } from "../../Redux/cartSlice";

const Counter = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.items);
  const handleSelectChange = (e) =>
    dispatch(
      updateCart({ itemId: product.inCart.itemId, quantity: e.target.value })
    );

  return (
    <div>
      <select onChange={(e) => handleSelectChange(e)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
  );
};

export default Counter;
