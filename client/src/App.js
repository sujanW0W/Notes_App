import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import UpdateNote from "./components/UpdateNote";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="note">
                        <Route path=":id" element={<UpdateNote />} />
                    </Route>

                    <Route path="users">
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>

                    <Route path="/*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
