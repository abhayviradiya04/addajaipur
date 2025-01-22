import {Link  } from "react-router-dom";


function Header() {
  return (
    <>
    

<header id="header-area" class="header__3">
    <div class="ruby-container">
        <div class="row">
            
            <div class="col-3 col-lg-1 col-xl-2 m-auto">
                <a  class="logo-area">
                    <img src="assets/img/logo-black.png" alt="Logo" class="img-fluid"/>
                </a>
            </div>
            

            
            <div class="col-3 col-lg-9 col-xl-8 m-auto">
                <div class="main-menu-wrap">
                    <nav id="mainmenu">
                        <ul>
                            
                            <li>
                            <Link to='/home'>Home</Link>
                            </li>
                            <li ><Link to='/Shop'>Shop</Link></li>
                           
                            <li class="dropdown-show"><a href="#">Pages</a>
                                <ul class="dropdown-nav">
                                    <li><Link to='/Cart'>Shopping Cart</Link></li>
                                    <li><Link to='/checkout'>Checkout</Link></li>
                                    <li><Link to='/compare'>Compare</Link></li>
                                    <li><Link to='wishlist'>Wishlist</Link></li>
                                    <li><Link to='login-register'>Login & Register</Link></li>
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                    <li><Link to='/error'>404 Error</Link></li>
                                </ul>
                            </li>
                            <li class="dropdown-show"><a href="#">Men</a>
                                <ul class="mega-menu-wrap dropdown-nav">
                                    <li class="mega-menu-item"><a href="shop-left-full-wide.html"
                                                                  class="mega-item-title">Shirt</a>
                                        <ul>
                                            <li><a href="shop.html">Tops & Tees</a></li>
                                            <li><a href="shop.html">Polo Short Sleeve</a></li>
                                            <li><a href="shop.html">Graphic T-Shirts</a></li>
                                            <li><a href="shop.html">Jackets & Coats</a></li>
                                            <li><a href="shop.html">Fashion Jackets</a></li>
                                        </ul>
                                    </li>

                                    <li class="mega-menu-item"><a href="shop-left-full-wide.html"
                                                                  class="mega-item-title">Jeans</a>
                                        <ul>
                                            <li><a href="shop.html">Crochet</a></li>
                                            <li><a href="shop.html">Sleeveless</a></li>
                                            <li><a href="shop.html">Stripes</a></li>
                                            <li><a href="shop.html">Sweaters</a></li>
                                            <li><a href="shop.html">Hoodies</a></li>
                                        </ul>
                                    </li>

                                    <li class="mega-menu-item"><a href="shop-left-full-wide.html"
                                                                  class="mega-item-title">Shoes</a>
                                        <ul>
                                            <li><a href="shop.html">Tops & Tees</a></li>
                                            <li><a href="shop.html">Polo Short Sleeve</a></li>
                                            <li><a href="shop.html">Graphic T-Shirts</a></li>
                                            <li><a href="shop.html">Jackets & Coats</a></li>
                                            <li><a href="shop.html">Fashion Jackets</a></li>
                                        </ul>
                                    </li>

                                    <li class="mega-menu-item"><a href="shop-left-full-wide.html"
                                                                  class="mega-item-title">Watches</a>
                                        <ul>
                                            <li><a href="shop.html">Crochet</a></li>
                                            <li><a href="shop.html">Sleeveless</a></li>
                                            <li><a href="shop.html">Stripes</a></li>
                                            <li><a href="shop.html">Sweaters</a></li>
                                            <li><a href="shop.html">Hoodies</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown-show"><a href="shop-left-full-wide.html">Women</a>
                                <ul class="mega-menu-wrap dropdown-nav">
                                    <li class="mega-menu-item"><a href="shop-left-full-wide.html"
                                                                  class="mega-item-title">Kamiz</a>
                                        <ul>
                                            <li><a href="shop.html">Tops & Tees</a></li>
                                            <li><a href="shop.html">Polo Short Sleeve</a></li>
                                            <li><a href="shop.html">Graphic T-Shirts</a></li>
                                            <li><a href="shop.html">Jackets & Coats</a></li>
                                            <li><a href="shop.html">Fashion Jackets</a></li>
                                        </ul>
                                    </li>

                                    <li class="mega-menu-item"><a href="shop-left-full-wide.html"
                                                                  class="mega-item-title">Life Style</a>
                                        <ul>
                                            <li><a href="shop.html">Crochet</a></li>
                                            <li><a href="shop.html">Sleeveless</a></li>
                                            <li><a href="shop.html">Stripes</a></li>
                                            <li><a href="shop.html">Sweaters</a></li>
                                            <li><a href="shop.html">Hoodies</a></li>
                                        </ul>
                                    </li>

                                    <li class="mega-menu-item"><a href="shop-left-full-wide.html"
                                                                  class="mega-item-title">Shoes</a>
                                        <ul>
                                            <li><a href="shop.html">Tops & Tees</a></li>
                                            <li><a href="shop.html">Polo Short Sleeve</a></li>
                                            <li><a href="shop.html">Graphic T-Shirts</a></li>
                                            <li><a href="shop.html">Jackets & Coats</a></li>
                                            <li><a href="shop.html">Fashion Jackets</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to='/blog'>Blog</Link>
                            </li>
                            <li><Link to='/contact'>Contact Us</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
           
            <div class="col-6 col-lg-2 m-auto">
                <div class="header-right-meta text-right">
                    <ul>
                        <li><a href="#" class="modal-active"><i class="fa fa-search"></i></a></li>
                        <li class="settings"><a href="#"><i class="fa fa-cog"></i></a>
                            <div class="site-settings d-block d-sm-flex">
                                <dl class="currency">
                                    <dt>Currency</dt>
                                    <dd class="current"><a href="#">USD</a></dd>
                                    <dd><a href="#">AUD</a></dd>
                                    <dd><a href="#">CAD</a></dd>
                                    <dd><a href="#">BDT</a></dd>
                                </dl>

                                <dl class="my-account">
                                    <dt>My Account</dt>
                                    <dd><a href="#">Dashboard</a></dd>
                                    <dd><a href="#">Profile</a></dd>
                                    <dd><a href="#">Sign</a></dd>
                                </dl>

                                <dl class="language">
                                    <dt>Language</dt>
                                    <dd class="current"><a href="#">English (US)</a></dd>
                                    <dd><a href="#">English (UK)</a></dd>
                                    <dd><a href="#">Chinees</a></dd>
                                    <dd><a href="#">Bengali</a></dd>
                                    <dd><a href="#">Hindi</a></dd>
                                    <dd><a href="#">Japanees</a></dd>
                                </dl>
                            </div>
                        </li>
                        <li class="shop-cart"><a href="#"><i class="fa fa-shopping-bag"></i> <span
                                class="count">3</span></a>
                            <div class="mini-cart">
                                <div class="mini-cart-body">
                                    <div class="single-cart-item d-flex">
                                        <figure class="product-thumb">
                                            <a href="#"><img class="img-fluid" src="assets/img/product-1.jpg"
                                                             alt="Products"/></a>
                                        </figure>

                                        <div class="product-details">
                                            <h2><a href="#">Sprite Yoga Companion</a></h2>
                                            <div class="cal d-flex align-items-center">
                                                <span class="quantity">3</span>
                                                <span class="multiplication">X</span>
                                                <span class="price">$77.00</span>
                                            </div>
                                        </div>
                                        <a href="#" class="remove-icon"><i class="fa fa-trash-o"></i></a>
                                    </div>
                                    <div class="single-cart-item d-flex">
                                        <figure class="product-thumb">
                                            <a href="#"><img class="img-fluid" src="assets/img/product-2.jpg"
                                                             alt="Products"/></a>
                                        </figure>
                                        <div class="product-details">
                                            <h2><a href="#">Yoga Companion Kit</a></h2>
                                            <div class="cal d-flex align-items-center">
                                                <span class="quantity">2</span>
                                                <span class="multiplication">X</span>
                                                <span class="price">$6.00</span>
                                            </div>
                                        </div>
                                        <a href="#" class="remove-icon"><i class="fa fa-trash-o"></i></a>
                                    </div>
                                    <div class="single-cart-item d-flex">
                                        <figure class="product-thumb">
                                            <a href="#"><img class="img-fluid" src="assets/img/product-3.jpg"
                                                             alt="Products"/></a>
                                        </figure>
                                        <div class="product-details">
                                            <h2><a href="#">Sprite Yoga Companion Kit</a></h2>
                                            <div class="cal d-flex align-items-center">
                                                <span class="quantity">1</span>
                                                <span class="multiplication">X</span>
                                                <span class="price">$116.00</span>
                                            </div>
                                        </div>
                                        <a href="#" class="remove-icon"><i class="fa fa-trash-o"></i></a>
                                    </div>
                                </div>
                                <div class="mini-cart-footer">
                                    <Link to='checkout' class="btn-add-to-cart">Checkout</Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    </div>
</header>



<div class="body-popup-modal-area">
    <span class="modal-close"><img src="assets/img/cancel.png" alt="Close" class="img-fluid"/></span>
    <div class="modal-container d-flex">
        <div class="search-box-area">
            <div class="search-box-form">
                <form action="#" method="post">
                    <input type="search" placeholder="type keyword and hit enter"/>
                    <button class="btn" type="button"><i class="fa fa-search"></i></button>
                </form>
            </div>
        </div>
    </div>
</div>



    </>
  );
}
export default Header;