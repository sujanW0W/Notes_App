import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";

import "../assets/styles/loginOrRegister.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
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

    const [alert, setAlert] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const togglePassword = () => {
        setPasswordVisibility(!passwordVisibility);
        setPasswordType(passwordType === "text" ? "password" : "text");
    };

    const handleSubmit = async () => {
        const URL = "http://localhost:5050/api/v1/users/login";
        const payload = { username, password };

        try {
            const response = await axios.post(URL, payload);
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (err) {
            setAlert(true);
            console.log("error: " + err);
        }
    };

    return (
        <section className="loginSection">
            <div className="inputSection">
                <div id="loginLogo">
                    <LockIcon />
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
                    Submit
                </Button>
                {alert && (
                    <Alert
                        severity="error"
                        variant="filled"
                        onClose={() => {
                            setAlert(false);
                        }}
                        sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "16px",
                        }}
                    >
                        Login Failed!
                    </Alert>
                )}
                <p className="registerIfNot">
                    Not Registered?
                    <span>
                        <Link to="/users/register">Register</Link>
                    </span>
                </p>
            </div>
        </section>
    );
};

export default Login;
