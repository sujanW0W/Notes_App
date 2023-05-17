import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/loginOrRegister.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.getItem("token") && navigate("/");
    }, [navigate]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const togglePassword = () => {
        setPasswordVisibility(!passwordVisibility);
        setPasswordType(passwordType === "text" ? "password" : "text");
    };

    const handleSubmit = async () => {
        const URL = "http://localhost:5050/api/v1/users/register";
        const payload = { username, password };

        try {
            const response = await axios.post(URL, payload);
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (error) {
            console.log("error" + error);
        }
    };

    return (
        <section className="loginSection">
            <div className="inputSection">
                <div id="loginLogo">
                    <PersonIcon />
                </div>
                <TextField
                    id="standard-basic"
                    label="Username"
                    variant="standard"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        id="standard-basic"
                        label="Password"
                        variant="standard"
                        type={passwordType}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        style={{
                            position: "absolute",
                            right: "1px",
                            scale: ".7",
                            cursor: "pointer",
                        }}
                        onClick={togglePassword}
                    >
                        {passwordVisibility ? (
                            <VisibilityOffIcon />
                        ) : (
                            <VisibilityIcon />
                        )}
                    </span>
                </div>

                <Button
                    variant="contained"
                    type="submit"
                    id="submit"
                    onClick={handleSubmit}
                >
                    Register
                </Button>

                <p className="registerIfNot">
                    Already a User?
                    <span>
                        <Link to="/users/login">Login</Link>
                    </span>
                </p>
            </div>
        </section>
    );
};

export default Login;
