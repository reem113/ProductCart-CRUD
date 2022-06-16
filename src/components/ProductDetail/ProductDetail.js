import "../style.css";

import React, { useEffect, useState } from "react";
import { addToCart, removeItem } from "../../Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

import Counter from "../Counter/Counter";
import { productsFetch } from "../../Redux/productsSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false)
  const product = useSelector((state) => state.products.items);

  const handleAddToCart = (product) => {
    setAdded(true);
    dispatch(addToCart(product));
  };
  const handleRemoveFromCart = (product) => {
    setAdded(false)
    dispatch(removeItem(product));
  };

  useEffect(() => {
    dispatch(productsFetch());
  }, [dispatch]);

  return (
    <>
      {/* <BreadCrumb /> */}
      <section>
        {product && (
          <div className="container mt-5 mb-5">
            <div className="product-info">
              <div className="img-container">
                <img className="img" src={product.image} alt={product.id} />
              </div>
              <div>
                <div className="img-header-container">
                  <div className="product-name">{product.name}</div>
                  <div className="price">
                    <span className="product-price">{product.finalPrice}</span>
                    <span className="product-currency">LE</span>
                  </div>
                  <div>
                    <Counter />
                    <div
                      onClick={() => handleRemoveFromCart(product)}
                      className="remove"
                    >
                      Remove
                    </div>
                  </div>
                </div>
                <div>
                  <p className="description">
                    Quis deserunt nostrud veniam culpa ipsum nostrud nostrud et
                    irure ad. Dolore officia eiusmod culpa exercitation pariatur
                    reprehenderit deserunt aute fugiat adipisicing nulla. Eu
                    culpa non quis do mollit mollit culpa qui. Cillum fugiat est
                    exercitation in occaecat reprehenderit ad ea exercitation
                    cillum magna. Fugiat nulla ipsum cupidatat laboris occaecat
                    mollit. Anim magna ullamco est proident laboris duis aliquip
                    nostrud occaecat exercitation consectetur do mollit do.
                    Cupidatat sint labore exercitation dolor duis commodo
                    consequat non sit tempor non incididunt est. Sunt ex
                    voluptate aliqua exercitation. Do cillum id aute anim
                    laborum est in pariatur nostrud fugiat laboris ipsum ut sit.
                    Qui nisi magna dolore culpa non ex ad sit nostrud. Lorem
                    labore reprehenderit laborum deserunt fugiat ea consectetur
                    reprehenderit do cupidatat.
                  </p>
                </div>

                <div>
                  {
                    <button
                      className=" btn-main"
                      onClick={() => handleAddToCart(product)}
                    >
                      {added ? 'Added To Cart' : 'Add'}
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <hr />
    </>
  );
};

export default ProductDetail;
