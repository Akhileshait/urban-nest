import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
     const [open, setOpen]=useState(false);
     const { currentUser } = useContext(AuthContext);

     

     return (
          <nav>
               <div className="left">
                    <a href="#" className="logo">
                         <img src="logo.png" alt="Logo" />
                         <span>UrbanNest</span>
                    </a>
                    <a href='/'>Home</a>
                    <a href='/'>About</a>
                    <a href='/'>Contact</a>
                    <a href='/'>Agents</a>
               </div>
               <div className="right">
                    {
                         currentUser ? (
                              <div className="user">
                                   <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
                                   <span>{currentUser.username}</span>
                                   <Link to="/profile" className="profile">
                                   <div className="notification">3</div>
                                   <span>Profile</span>
                                   </Link>
                              </div>
                         ):(
                              <>
                              <a href="/login">Sign in</a>
                              <a href="/register" className="register">Sign up</a>
                              </>
                         )
                    }
                    <div className="menuIcon">
                         <img src="/menu.png" alt="" onClick={()=>setOpen((prev)=>!prev)} />
                    </div>
                    <div className={open ? "menu active":"menu"}>
                         <a href="">Home</a>
                         <a href="">About</a>
                         <a href="">Contact</a>
                         <a href="">Agents</a>
                         <a href="/login">Sign in</a>
                         <a href="/register">Sign up</a>
                         
                    </div>
                    

                    
               </div>
          </nav>
     )
}

export default Navbar;