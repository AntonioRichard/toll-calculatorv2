import React from "react";
import {Link} from 'react-router-dom';

const NotFoundPage = ()=> (
    <div className="remove-header-overlay">
       <p id="not_found_page">404 - <Link to='/'>Go to the home page</Link></p>
    </div>
);

export default NotFoundPage;