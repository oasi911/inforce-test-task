import React, { useState, useEffect } from "react";
import styles from "./ProductModal.module.css";

const ProductModal = ({ isOpen, onClose, onSave, initialProduct = null }) => {
  const [product, setProduct] = useState({
    imageUrl: "",
    name: "",
    count: "",
    size: { width: "", height: "" },
    weight: "",
    comments: [],
  });

  useEffect(() => {
    if (initialProduct) setProduct(initialProduct);
  }, [initialProduct]);

  const isEditMode = initialProduct !== null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, size: { ...product.size, [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.name}>{isEditMode ? "Edit Product" : "Add New Product"}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product name"
            required
          />
          <input
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <input
            name="count"
            type="number"
            value={product.count}
            onChange={handleChange}
            placeholder="Count"
            required
          />
          <input
            name="width"
            type="number"
            value={product.size.width}
            onChange={handleSizeChange}
            placeholder="Width"
            required
          />
          <input
            name="height"
            type="number"
            value={product.size.height}
            onChange={handleSizeChange}
            placeholder="Height"
            required
          />
          <input
            name="weight"
            value={product.weight}
            onChange={handleChange}
            placeholder="Weight"
            required
          />
          <button type="submit">Save Product</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
