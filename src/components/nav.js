import React from 'react';
import '../nav.scss';
export default function Nav(){
  return(
    <nav className="navbar">
           <a href="/">Home</a> 
           <a href="/Dictations">Dictations</a> 
           <a href="/published">Published</a>
           <a href="/signup">Sign up</a> 
           <a href="/signin">Log in</a>
           <a href="/" onClick={()=>
           {localStorage.removeItem("userid")}}>Sign Out</a>
      </nav>
  )
}