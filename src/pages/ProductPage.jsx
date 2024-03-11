import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProductsAsync,
  updateProductAsync,
} from "../redux/products/productsSlice";
import ProductModal from "../components/ProductModal";

const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((product) => product.id.toString() === productId)
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, product]);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveProduct = async (editedProduct) => {
    try {
      await dispatch(updateProductAsync(editedProduct));
      dispatch(fetchProductsAsync());
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Count: {product.count}</p>
      <p>Image URL: {product.imageUrl}</p>
      <p>
        Size: {product.size.width} x {product.size.height}
      </p>
      <p>Weight: {product.weight}</p>
      {/* Display other details */}
      <button onClick={handleEdit}>Edit</button>

      <ProductModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        initialProduct={product}
      />
    </div>
  );
};

export default ProductPage;
