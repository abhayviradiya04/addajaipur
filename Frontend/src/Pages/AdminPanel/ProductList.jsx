import React from 'react';
import './ProductList.css'; // Import the CSS file for ProductList

const ProductList = ({ products, updateProduct, deleteProduct, setEditingProduct }) => {
    return (
        <div className="product-list">
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id} className="product-item">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <button onClick={() => setEditingProduct(product)}>Edit</button>
                            <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
