import React,{useState,useEffect} from "react";
import './Header.css';
import {NavLink} from 'react-router-dom';

function Header()
{
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll); // cleanup
        };
    }, []);

    return(<>
        <div  className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="leftSideHeader">
                <h1>BlogStore</h1>
            </div>
            <div className="rightSideHeader">
                <NavLink to="" className="home">Home</NavLink>
                <NavLink to="" className="about">About</NavLink>
                <NavLink to="" className="contact">Contact</NavLink>
                <button className="signInButton">
                    <NavLink to="/signup" className="signInId">
                        Sign in
                    </NavLink>
                </button>
            </div>
        </div>
    </>)
}

export default Header;