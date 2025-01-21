import {Link} from 'react-router-dom';


function Compare() {
  return (
   <>
   
<div id="page-title-area">
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <div class="page-title-content">
                    <h1>Compare</h1>
                    <ul class="breadcrumb">
                    <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/shop'>Shop</Link></li>
                        <li><Link to='/compare' className='active'>Compare</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="page-content-wrapper" class="p-9">
    <div class="ruby-container">
        <div class="row">
            <div class="col-lg-12">
                
                <div class="compare-page-content-wrap">
                    <div class="compare-table table-responsive">
                        <table class="table table-bordered mb-0">
                            <tbody>
                            <tr>
                                <td class="first-column">Product</td>
                                <td class="product-image-title">
                                    <a href="single-product.html" class="image"><img class="img-fluid"
                                                                                     src="assets/img/product-1.jpg"
                                                                                     alt="Compare Product"/></a>
                                    <a href="#" class="category">Daimond</a>
                                    <a href="#" class="title">Zeon Zen 4 Pro</a>
                                </td>
                                <td class="product-image-title">
                                    <a href="single-product.html" class="image"><img class="img-fluid"
                                                                                     src="assets/img/product-2.jpg"
                                                                                     alt="Compare Product"/></a>
                                    <a href="#" class="category">Gold</a>
                                    <a href="#" class="title">Aquet Doren D 420</a>
                                </td>
                                <td class="product-image-title">
                                    <a href="single-product.html" class="image"><img class="img-fluid"
                                                                                     src="assets/img/product-3.jpg"
                                                                                     alt="Compare Product"/></a>
                                    <a href="#" class="category">Ring</a>
                                    <a href="#" class="title">Game Station X 22</a>
                                </td>
                            </tr>
                            <tr>
                                <td class="first-column">Description</td>
                                <td class="pro-desc">
                                    <p>Samsome Note Book Pro 5 is an the best Laptop on this budgeted. You can satisfied
                                        after usign this laptop. It’s performance is awesome.</p>
                                </td>
                                <td class="pro-desc">
                                    <p>Samsome Note Book Pro 5 is an the best Laptop on this budgeted. You can satisfied
                                        after usign this laptop. It’s performance is awesome.</p>
                                </td>
                                <td class="pro-desc">
                                    <p>Samsome Note Book Pro 5 is an the best Laptop on this budgeted. You can satisfied
                                        after usign this laptop. It’s performance is awesome.</p>
                                </td>
                            </tr>
                            <tr>
                                <td class="first-column">Price</td>
                                <td class="pro-price">$295</td>
                                <td class="pro-price">$275</td>
                                <td class="pro-price">$395</td>
                            </tr>
                            <tr>
                                <td class="first-column">Color</td>
                                <td class="pro-color">Black</td>
                                <td class="pro-color">Red</td>
                                <td class="pro-color">Blue</td>
                            </tr>
                            <tr>
                                <td class="first-column">Stock</td>
                                <td class="pro-stock">In Stock</td>
                                <td class="pro-stock">Stock Out</td>
                                <td class="pro-stock">In Stock</td>
                            </tr>
                            <tr>
                                <td class="first-column">Add to cart</td>
                                <td><a href="single-product.html" class="btn-add-to-cart">Add to Cart</a></td>
                                <td><a href="single-product.html" class="btn-add-to-cart">Add to Cart</a></td>
                                <td><a href="single-product.html" class="btn-add-to-cart">Add to Cart</a></td>
                            </tr>
                            <tr>
                                <td class="first-column">Delete</td>
                                <td class="pro-remove">
                                    <button><i class="fa fa-trash-o"></i></button>
                                </td>
                                <td class="pro-remove">
                                    <button><i class="fa fa-trash-o"></i></button>
                                </td>
                                <td class="pro-remove">
                                    <button><i class="fa fa-trash-o"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td class="first-column">Rating</td>
                                <td class="pro-ratting">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star-o"></i>
                                </td>
                                <td class="pro-ratting">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                </td>
                                <td class="pro-ratting">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star-o"></i>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>

   </>
  );
}
export default Compare;