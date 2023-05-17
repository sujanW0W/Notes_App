import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";

const CreateNote = ({ updateList, setUpdateList }) => {
    const [note, setNote] = useState("");
    const [alert, setAlert] = useState(false);

    const handleChange = (e) => setNote(e.target.value);

    const handleSubmit = async () => {
        const URL = "http://localhost:5050/api/v1/notes";

        const isToken = Boolean(localStorage.getItem("token"));

        if (!isToken) {
            setAlert(true);
            return;
        }
        await axios.post(
            URL,
            { note },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        setNote("");
        setUpdateList(!updateList);
    };

    return (
        <div className="createNote">
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
                        width: "25vw",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "10px",
                    }}
                >
                    Login First!
                </Alert>
            )}
        </div>
    );
};

export default CreateNote;
