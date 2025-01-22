import {Link} from 'react-router-dom';

function ContactUs() {
  return (
   <>
   

<div id="page-title-area">
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <div class="page-title-content">
                    <h1>Contact Us</h1>
                    <ul class="breadcrumb">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="login-register.html" class="active">Contact</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="page-content-wrapper" class="p-9">
    <div class="container">
        <div class="row">
            
            <div class="col-lg-12">
                
                <div class="contact-method-wrap">
                    <div class="row">
                        
                        <div class="col-lg-3 col-sm-6 text-center">
                            <div class="contact-method-item">
                                <span class="method-icon"><i class="fa fa-map-marker"></i></span>
                                <div class="method-info">
                                    <h3>Street Address</h3>
                                    <p>Address : Nairobi 3232 <br/> Nairobi, Kenya</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 text-center">
                            <div class="contact-method-item">
                                <span class="method-icon"><i class="fa fa-phone"></i></span>
                                <div class="method-info">
                                    <h3>Phone Number</h3>
                                    <a href="tel:0(1234)56789012">0(1234) 567 89012</a>
                                    <a href="tel:0(1234)56789012">0(1323) 466 89012</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 text-center">
                            <div class="contact-method-item">
                                <span class="method-icon"><i class="fa fa-envelope-open-o"></i></span>
                                <div class="method-info">
                                    <h3>Number Fax</h3>
                                    <p>+1 323 555 1234 <br/> +1 267 555 12342</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-lg-3 col-sm-6 text-center">
                            <div class="contact-method-item">
                                <span class="method-icon"><i class="fa fa-envelope"></i></span>
                                <div class="method-info">
                                    <h3>Email Address</h3>
                                    <a href="mailto:your@email.here">your@email.here</a>
                                    <a href="mailto:your@email.here">your@email.here</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            
        </div>

        <div class="row">
            
            <div class="col-lg-9 m-auto">
                <div class="contact-form-wrap">
                    <h2>Request a Quote</h2>

                    <form id="contact-form" action="https://d29u17ylf1ylz9.cloudfront.net/ruby-v2/ruby/assets/php/mail.php" method="post">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="single-input-item">
                                    <input type="text" name="first_name" placeholder="First Name *" required/>
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="single-input-item">
                                    <input type="text" name="last_name" placeholder="Last Name *" required/>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="single-input-item">
                                    <input type="email" name="email_address" placeholder="Email Address *" required/>
                                </div>
                            </div>

                            <div class="col-lg-6">
                                <div class="single-input-item">
                                    <input type="text" name="contact_subject" placeholder="Subject *" required/>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="single-input-item">
                                    <textarea name="message" id="message" cols="30" rows="6"
                                              placeholder="Message"></textarea>
                                </div>

                                <div class="single-input-item text-center">
                                    <button type="submit" name="submit" class="btn-add-to-cart">Send Meassage</button>
                                </div>

                                
                                <div class="form-messege"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    </div>
</div>
   </>
  );
}
export default ContactUs;