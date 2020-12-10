import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const signOut = () => {
        const signedOutUser = {
              isSignedIn: false,
              name: '',
              email: '',
              photo: '',
              error: '',
              success: false
            }            
            setLoggedInUser(signedOutUser);
            localStorage.clear();
            sessionStorage.clear();            
      }
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
        {loggedInUser.isSignedIn &&<img src={loggedInUser.photo} alt="" width="5%" height="5%"  className="rounded-circle"/>}
            <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <Link className="nav-link mr-5" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link mr-5" to="#">Contact Us</Link>
                </li>
                {loggedInUser.isSignedIn ? <li className="nav-item">
                    <Link className="nav-link mr-5" onClick={signOut}>LogOut</Link>
                </li> : 
                <li className="nav-item">
                    <Link className="nav-link mr-5" to="/login">Login</Link>
                </li>}
                {/* <li className="nav-item">
                    <Link className="nav-link mr-5" to="#">Blogs</Link>
                </li> */}
                
            </ul>
        </div>
    </nav>
    );
};

export default Navbar;