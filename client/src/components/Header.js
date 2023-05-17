import { Link } from "react-router-dom";
import "../assets/styles/header.css";
import { useState } from "react";

const Header = () => {
    const [loginStatus, setLoginStatus] = useState(
        Boolean(localStorage.getItem("token"))
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoginStatus(false);

        window.location.reload(false);
    };

    return (
        <header className="headTop">
            <div className="headLeft">
                <div className="logo">
                    <img src="/logo.png" alt="LOGO" id="logo" />
                </div>
                <div className="headMenu">
                    <a href="/">Home</a>
                    <a href="/">About Us</a>
                    <a href="/">Features</a>
                    <a href="/">Contact</a>
                </div>
            </div>

            {loginStatus ? (
                <Link className="loginButton" to="/" onClick={handleLogout}>
                    Logout
                </Link>
            ) : (
                <Link className="loginButton" to="/users/login">
                    Login
                </Link>
            )}
        </header>
    );
};

export default Header;
