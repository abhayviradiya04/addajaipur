
import {Link} from 'react-router-dom';
function Error() {
  return (
    <>
    
<div id="page-title-area">
    <div class="container">
        <div class="row">
            <div class="col-12 text-center">
                <div class="page-title-content">
                    <h1>404</h1>
                    <ul class="breadcrumb">
                    <li><Link to='/home'>Home</Link></li>
                      
                        <li><Link to='/error' className='active'>404</Link></li>
                  </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="page-content-wrapper" class="p-9">
    <div class="container">
        <div class="row">
            <div class="col-lg-6  m-auto text-center">
                <div class="error-page-content-wrap">
                    <h2>404</h2>
                    <h3>PAGE NOT BE FOUND</h3>
                    <p>Sorry but the page you are looking for does not exist, have been removed, name changed or is
                        temporarily unavailable.</p>
                    <div class="sidebar-search">
                        <form action="#">
                            <input type="search" placeholder="type Keyword"/>
                            <button type="submit"><i class="fa fa-search"></i></button>
                        </form>
                    </div>

                    <Link to='/home' class="btn-add-to-cart">Back to Home Page</Link>
                </div>
            </div>
        </div>
    </div>
</div>

    </>
  )
}

export default Error;