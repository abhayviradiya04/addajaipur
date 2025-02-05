import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate
    // Remove searchQuery state
    const [selectedType, setSelectedType] = useState('');
    const [selectedSubtype, setSelectedSubtype] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [types, setTypes] = useState([]);
    const [filteredSubtypes, setFilteredSubtypes] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://addajaipur.onrender.com/api/products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
                // Extract unique types
                const uniqueTypes = [...new Set(data.map(product => product.type))];
                setTypes(uniqueTypes);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Updated useEffect for filtering products (removed searchMatch)
    useEffect(() => {
        const filterProducts = () => {
            const filtered = products.filter(product => {
                const typeMatch = selectedType === '' || product.type === selectedType;
                const subtypeMatch = selectedSubtype === '' || product.subtype === selectedSubtype;
                const minPriceMatch = minPrice === '' || product.price >= parseInt(minPrice);
                const maxPriceMatch = maxPrice === '' || product.price <= parseInt(maxPrice);

                return typeMatch && subtypeMatch && minPriceMatch && maxPriceMatch;
            });
            setFilteredProducts(filtered);
        };

        filterProducts();
    }, [products, selectedType, selectedSubtype, minPrice, maxPrice]);

    // Update filtered subtypes when type changes
    useEffect(() => {
        if (products.length > 0) {
            if (selectedType) {
                const subtypesForType = [...new Set(
                    products
                        .filter(product => product.type === selectedType)
                        .map(product => product.subtype)
                )];
                setFilteredSubtypes(subtypesForType);
            } else {
                setFilteredSubtypes([...new Set(products.map(product => product.subtype))]);
            }
        }
    }, [selectedType, products]);

    const deleteProduct = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://addajaipur.onrender.com/api/products/deleteproduct/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete product');
                }

                setProducts(products.filter(product => product._id !== id));
                Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    return (
        <div className="product-list-admin">
            <h2>Product List</h2>

            {/* Filter Section without search input */}
            <div className="filter-section">
                <div className="filter-grid">
                    <select 
                        value={selectedType}
                        onChange={(e) => {
                            setSelectedType(e.target.value);
                            setSelectedSubtype('');
                        }}
                        className="filter-select"
                    >
                        <option value="">Select Type</option>
                        {types.map(type => (
                            <option key={type} value={type}>
                                {capitalizeFirstLetter(type)}
                            </option>
                        ))}
                    </select>
                    <select 
                        value={selectedSubtype}
                        onChange={(e) => setSelectedSubtype(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Select Subtype</option>
                        {filteredSubtypes.map(subtype => (
                            <option key={subtype} value={subtype}>
                                {capitalizeFirstLetter(subtype)}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="filter-input"
                        min="0"
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="filter-input"
                        min="0"
                    />
                </div>
            </div>

            <div className="product-grid-admin">
                {filteredProducts.map(product => (
                    <div key={product._id} className="product-card-admin">
                        <img src={product.image[0]} alt={product.name} className="product-image-admin" />
                        <div className="product-details-admin">
                            <h3>{product.name}</h3>
                            <p>Style Code: {product.stylecode}</p>
                            <p>Price: ₹{product.price}</p>
                            <div className="product-actions-admin">
                                <button onClick={() => navigate('/admin/form', { state: { product } })}>Edit</button>
                                <button onClick={() => deleteProduct(product._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
