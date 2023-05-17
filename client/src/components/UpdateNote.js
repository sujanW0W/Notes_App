import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Header from "../components/Header";
import "../assets/styles/updateNote.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateNote = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [note, setNote] = useState("");

    const fetchNoteById = async () => {
        const URL = `http://localhost:5050/api/v1/notes/${id}`;
        const response = await axios.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        setNote(response.data.note);
    };

    let token = localStorage.getItem("token");

    useEffect(() => {
        token && fetchNoteById();
    }, [token]);

    const handleChange = (e) => setNote(e.target.value);

    const handleSubmit = async () => {
        console.log(id, note);
        const URL = `http://localhost:5050/api/v1/notes/${id}`;

        await axios.patch(
            URL,
            { note },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        navigate("/");
    };

    return (
        <>
            <Header />
            <div className="updateSection">
                <h1>Update Note</h1>
                <div className="inputUpdate">
                    <TextField
                        fullWidth
                        label="Note"
                        placeholder="Enter text....."
                        multiline
                        variant="outlined"
                        id="createNote"
                        onChange={handleChange}
                        value={note}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        id="submit"
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                </div>
            </div>
        </>
    );
};

export default UpdateNote;
