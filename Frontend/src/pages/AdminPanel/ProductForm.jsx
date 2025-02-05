import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ProductForm.css'; // Importing external CSS file for styling

const ProductForm = ({ setEditingProduct, updateProduct }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const editingProduct = location.state?.product || null;
    
    const [product, setProduct] = useState(editingProduct || {
        id: Date.now(),
        name: '',
        stylecode: '',
        image: [],
        description: '',
        brand: { name: 'Adaa Jaipur' },
        price: '',
        material: '',
        pattern: '',
        type: '',
        subtype: '',
        size: '',
        fabricCare: '',
        lengthType: '',
        neck: '',
        stock: '',
    });

    useEffect(() => {
        if (editingProduct) {
            const fetchProductData = async () => {
                try {
                    const response = await fetch(`https://addajaipur.onrender.com/api/products/${editingProduct._id}`);
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error('Error fetching product data:', error);
                }
            };
            fetchProductData();
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = async (e) => {
        const files = e.target.files;
        const uploadedImageUrls = [];

        for (let file of files) {
            const formData = new FormData();
            formData.append('image', file);
            try {
                const response = await fetch(`https://addajaipur.onrender.com/api/upload`, { method: 'POST', body: formData });
                if (!response.ok) throw new Error('Error uploading image');
                const data = await response.json();
                uploadedImageUrls.push(data.imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
        setProduct({ ...product, image: [...product.image, ...uploadedImageUrls] });
    };

    const removeImage = (index) => {
        setProduct({ ...product, image: product.image.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingProduct 
                ? `https://addajaipur.onrender.com/api/products/updateProduct/${editingProduct._id}`
                : 'https://addajaipur.onrender.com/api/products/addproduct';
            
            const method = editingProduct ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            
            if (!response.ok) throw new Error(editingProduct ? 'Failed to update product' : 'Failed to add product');
            
            Swal.fire({
                title: editingProduct ? 'Updated!' : 'Added!',
                text: `Your product has been ${editingProduct ? 'updated' : 'added'}.`,
                icon: 'success',
                confirmButtonText: 'OK',
            });
            setEditingProduct(null);
            navigate('/admin');
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

   
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="product-form">
                <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>

                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input type="text" id="name" name="name" value={product.name} onChange={handleChange} placeholder="e.g., Embroidered Kurti" required />
                </div>
                <div className="form-group">
                    <label htmlFor="stylecode">Style Code:</label>
                    <input type="text" id="stylecode" name="stylecode" value={product.stylecode} onChange={handleChange} placeholder="e.g., ABC-1234" required />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" name="image" onChange={handleFileChange} multiple required={!editingProduct} />
                    <div className="uploaded-images">
                        {product.image.map((img, index) => (
                            <div key={index} className="image-preview">
                                <img src={img} alt={`Product ${index + 1}`} />
                                <button type="button" onClick={() => removeImage(index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={product.description} onChange={handleChange} placeholder="e.g., Beautifully handcrafted kurti with intricate embroidery." required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" name="price" value={product.price} onChange={handleChange} placeholder="e.g., 999" required />
                </div>
                <div className="form-group">
                    <label htmlFor="material">Material:</label>
                    <input type="text" id="material" name="material" value={product.material} onChange={handleChange} placeholder="e.g., Cotton Silk" required />
                </div>
                <div className="form-group">
                    <label htmlFor="pattern">Pattern:</label>
                    <input type="text" id="pattern" name="pattern" value={product.pattern} onChange={handleChange} placeholder="e.g., Floral print" required />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    <input type="text" id="type" name="type" value={product.type} onChange={handleChange} placeholder="e.g., Kurti" required />
                </div>
                <div className="form-group">
                    <label htmlFor="subtype">Subtype:</label>
                    <input type="text" id="subtype" name="subtype" value={product.subtype} onChange={handleChange} placeholder="e.g., Anarkali" required />
                </div>
                <div className="form-group">
                    <label htmlFor="size">Size:</label>
                    <select id="size" name="size" value={product.size} onChange={handleChange} required>
                        <option value="">Select Size</option>
                        <option value="XS">XS</option> <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fabricCare">Fabric Care:</label>
                    <input type="text" id="fabricCare" name="fabricCare" value={product.fabricCare} onChange={handleChange} placeholder="e.g., Machine wash" required />
                </div>
                <div className="form-group">
                    <label htmlFor="lengthType">Length Type:</label>
                    <input type="text" id="lengthType" name="lengthType" value={product.lengthType} onChange={handleChange} placeholder="e.g., Knee length" required />
                </div>
                <div className="form-group">
                    <label htmlFor="neck">Neck:</label>
                    <input type="text" id="neck" name="neck" value={product.neck} onChange={handleChange} placeholder="e.g., Round neck" required />
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Stock:</label>
                    <input type="number" id="stock" name="stock" value={product.stock} onChange={handleChange} placeholder="e.g., 100" required />
                </div>



                <div className="form-buttons">
                    <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
                    <Link to="/admin"><button type="button" className="cancel-btn">Cancel</button></Link>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
