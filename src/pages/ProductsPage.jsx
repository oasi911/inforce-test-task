// pages/ProductsPage.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAsync,
  deleteProductAsync,
  fetchProductsAsync,
} from "../redux/products/productsSlice";
import AddProductModal from "../components/AddProductModal";

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  const handleSaveProduct = (product) => {
    dispatch(addProductAsync(product));
  };

  const handleDelete = (productId) => {
    dispatch(deleteProductAsync(productId));
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Add New Product</button>
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />
      <div>
        <h1>Products</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name}
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductsPage;
