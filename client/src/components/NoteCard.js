import "../assets/styles/card.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NoteCard = (props) => {
    const navigate = useNavigate();
    let { id, note } = props.data;
    if (note.length > 100) note = note.slice(0, 100).concat(".....");

    const handleDelete = async () => {
        const URL = `http://localhost:5050/api/v1/notes/${id}`;

        const response = await axios.delete(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        props.setUpdateList(!props.updateList);
    };

    const handleUpdate = () => {
        navigate(`/note/${id}`);
    };

    return (
        <div className="card">
            <p className="notePara" onClick={handleUpdate}>
                {note}
            </p>
            <div className="options">
                <BorderColorIcon onClick={handleUpdate} />
                <DeleteIcon onClick={handleDelete} />
            </div>
        </div>
    );
};

export default NoteCard;
