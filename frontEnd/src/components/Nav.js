import { React } from "react";
import {Link , useNavigate} from 'react-router-dom';

const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate  = useNavigate();

    const logout = ()=>{
        localStorage.clear();
        navigate('/');
    }
    return(
        <div>
            <ul className="nav-ul">
                <li><Link to = "/">Home</Link></li>
                
                
                {auth?(
                    <>
                    <li><Link to = "/product">Product</Link></li>
                    <li><Link onClick={logout} to = "/">LOGOUT</Link></li>
                    </>
                    )
                :(
                <>
                <li><Link to="/signup">SIGN UP</Link></li>
                <li><Link to="/login">LOGIN</Link></li>
                </>)} 
                
                
            </ul>
        </div>
    ) ; 
}

export default Nav;