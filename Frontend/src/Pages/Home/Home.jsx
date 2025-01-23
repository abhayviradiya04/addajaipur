import React, { useEffect } from "react";

function Home() {
    
//   useEffect(() => {
//     const resources = {
//         styles: [
//           "assets/css/vendor/bootstrap.min.css",
//           "assets/css/vendor/font-awesome.css",
//           "assets/css/plugins.css",
//           "assets/css/style.css",
//           "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css",
//           "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css",
//         ],
//         scripts: [
//           "assets/js/vendor/jquery-3.3.1.min.js",
//           "assets/js/vendor/jquery-migrate-1.4.1.min.js",
//           "assets/js/vendor/popper.min.js",
//           "assets/js/vendor/bootstrap.min.js",
//           "assets/js/plugins.js",
//           "assets/js/active.js",
//           "https://code.jquery.com/jquery-3.6.0.min.js",
//           "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js",
//         ],
//       };
    
//       // Function to reload links and scripts dynamically
//       function loadResources() {
//         // Remove existing links and scripts if necessary
//         document.querySelectorAll("link[rel='stylesheet']").forEach((link) => link.remove());
//         document.querySelectorAll("script").forEach((script) => {
//           if (script.src) script.remove();
//         });
    
//         // Add CSS files
//         resources.styles.forEach((href) => {
//           const link = document.createElement("link");
//           link.rel = "stylesheet";
//           link.href = href;
//           link.onload = () => console.log(`Stylesheet loaded: ${href}`);
//           link.onerror = () => console.error(`Failed to load stylesheet: ${href}`);
//           document.head.appendChild(link);
//         });
    
//         // Add JS files
//         resources.scripts.forEach((src) => {
//           const script = document.createElement("script");
//           script.src = src;
//           script.onload = () => console.log(`Script loaded: ${src}`);
//           script.onerror = () => console.error(`Failed to load script: ${src}`);
//           document.body.appendChild(script);
//         });
//       }
    
//       // Call this function when navigating to the home page
//       function onHomePageRoute() {
//         loadResources(); // Reload resources for the home page
//         console.log("Navigated to the home page and resources reloaded.");
//       }
    
//       // Example: Call this function manually (or integrate it with your routing logic)
//       onHomePageRoute();
//     // Ensure jQuery and Owl Carousel are available globally
//     const $ = window.$;

//     // Initialize Owl Carousel
//     $("#banner-carousel").owlCarousel({
//       loop: true,
//       margin: 10,
//       nav: true,
//       items: 1,
//       autoplay: true,
//       autoplayTimeout: 3000, // 3 seconds delay
//       autoplayHoverPause: true,
//     });

//     // Cleanup to destroy the carousel instance on unmount
//     return () => {
//       $("#banner-carousel").trigger("destroy.owl.carousel");
//     };
//   }, []);

  return (
    
    <>
      <section id="banner-area" className="banner__3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div id="banner-carousel" className="owl-carousel">
                <div className="single-carousel-wrap home_4_slide_1">
                  <div className="banner-caption">
                    <h4>New Collection 2018</h4>
                    <h2>this looks beautiful</h2>
                    <p>
                      Eodem modo typi, qui nunc nobis videntur parum clari,
                      fiant sollemnes in futurum.
                    </p>
                    <a href="#" className="btn-long-arrow">
                      Shop Now
                    </a>
                  </div>
                </div>

                <div className="single-carousel-wrap home_4_slide_2">
                  <div className="banner-caption">
                    <h4>New Collection 2017</h4>
                    <h2>Beautiful Earrings</h2>
                    <p>
                      Eodem modo typi, qui nunc nobis videntur parum clari,
                      fiant sollemnes in futurum.
                    </p>
                    <a href="#" className="btn-long-arrow">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="products-area-wrapper" class="p-9">
    <div class="container-fluid">
      
        <div class="single-category-products">
            <div class="row">
                <div class="col-lg-6 mt-5 mt-lg-0">
                    <div class="products-categories-carousel owl-carousel">
                        <div class="single-pro-cate-slide">
                            <div class="products-wrapper products-gird">
                                <div class="row">
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-1.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-2.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-3.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-4.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>

                        <div class="single-pro-cate-slide">
                            <div class="products-wrapper products-gird">
                                <div class="row">
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-1.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-2.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-3.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-4.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>

                        <div class="single-pro-cate-slide">
                            <div class="products-wrapper products-gird">
                                <div class="row">
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-1.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-2.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-3.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-4.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 order-first order-lg-last">
                    <a href="#" class="product-category-name-warp d-flex">
                        <div class="category-title-box d-flex">
                            <h2 class="pro-cate-title">Men</h2>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    
        <div class="single-category-products">
            <div class="row">
                <div class="col-lg-6 mb-5 mb-lg-0">
                    <a href="#" class="product-category-name-warp women d-flex">
                        <div class="category-title-box d-flex">
                            <h2 class="pro-cate-title">Women</h2>
                        </div>
                    </a>
                </div>

                <div class="col-lg-6">
                    <div class="products-categories-carousel owl-carousel">
                        <div class="single-pro-cate-slide">
                            <div class="products-wrapper products-gird">
                                <div class="row">
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-1.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-2.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-3.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-4.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>

                        <div class="single-pro-cate-slide">
                            <div class="products-wrapper products-gird">
                                <div class="row">
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-1.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-2.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-3.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-4.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>

                        <div class="single-pro-cate-slide">
                            <div class="products-wrapper products-gird">
                                <div class="row">
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-1.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-2.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-3.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-4.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="single-category-products">
            <div class="row">
                <div class="col-lg-6 mt-5 mt-lg-0">
                    <div class="products-categories-carousel owl-carousel">
                        <div class="single-pro-cate-slide">
                            <div class="products-wrapper products-gird">
                                <div class="row">
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-1.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-2.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-3.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-4.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>

                        <div class="single-pro-cate-slide">
                            <div class="products-wrapper products-gird">
                                <div class="row">
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-1.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-2.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-3.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-4.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>

                        <div class="single-pro-cate-slide">
                            <div class="products-wrapper products-gird">
                                <div class="row">
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-1.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-2.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-3.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-4.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 order-first order-lg-last">
                    <a href="#" class="product-category-name-warp clothing d-flex">
                        <div class="category-title-box d-flex">
                            <h2 class="pro-cate-title">Clothing</h2>
                        </div>
                    </a>
                </div>
            </div>
        </div>
     
        <div class="single-category-products">
            <div class="row">
                <div class="col-lg-6 mb-5 mb-lg-0">
                    <a href="#" class="product-category-name-warp jewelry d-flex">
                        <div class="category-title-box d-flex">
                            <h2 class="pro-cate-title">Jewelry</h2>
                        </div>
                    </a>
                </div>

                <div class="col-lg-6">
                    <div class="products-categories-carousel owl-carousel">
                        <div class="single-pro-cate-slide">
                            <div class="products-wrapper products-gird">
                                <div class="row">
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-1.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-2.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-3.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-4.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div class="single-pro-cate-slide">
                            <div class="products-wrapper products-gird">
                                <div class="row">
                                   
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-1.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                 
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-2.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-3.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-4.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                 
                                </div>
                            </div>
                        </div>

                        <div class="single-pro-cate-slide">
                            <div class="products-wrapper products-gird">
                                <div class="row">
                                  
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-1.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                  
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-2.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                  
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-3.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                  
                                    <div class="col-sm-6">
                                        <div class="single-product-item">
                                            <figure class="product-thumb">
                                                <a href="#"><img src="assets/img/product-4.jpg" alt="Product"
                                                                 class="img-fluid"/></a>
                                            </figure>
                                            <div class="product-details">
                                                <h2><a href="single-product.html">Crown Summit Backpack</a></h2>
                                                <div class="rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star-half"></i>
                                                    <i class="fa fa-star-o"></i>
                                                </div>
                                                <span class="price">$52.00</span>
                                                <a href="single-product.html" class="btn btn-add-to-cart">+ Add to
                                                    Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
        </div>

    <section id="newsletter-area" class="p-9">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                
                    <div class="section-title">
                        <h2>Join The Newsletter</h2>
                        <p>Sign Up for Our Newsletter</p>
                    </div>
                
                </div>
            </div>

            <div class="row">
                <div class="col-lg-8 m-auto">
                    <div class="newsletter-form-wrap">
                        <form id="subscribe-form" action="https://d29u17ylf1ylz9.cloudfront.net/ruby-v2/ruby/assets/php/subscribe.php" method="post">
                            <input id="subscribe" type="email" name="email" placeholder="Enter your Email  Here" required/>
                            <button type="submit" class="btn-long-arrow">Subscribe</button>
                            <div id="result"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  );
}

export default Home;





