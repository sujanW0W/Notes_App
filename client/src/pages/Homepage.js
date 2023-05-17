import Header from "../components/Header";
import "../assets/styles/homepage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import CreateNote from "../components/CreateNote";

const Homepage = () => {
    const [notesList, setNotesList] = useState([]);

    const [updateList, setUpdateList] = useState(0);

    const fetchNotes = async () => {
        const URL = "http://localhost:5050/api/v1/notes";

        const list = await axios.get(URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        setNotesList(list.data);
    };

    let token = localStorage.getItem("token");

    useEffect(() => {
        token && fetchNotes();
    }, [token, updateList]);

    const notesCards =
        notesList.length > 0 ? (
            notesList.map((data, index) => {
                return (
                    <NoteCard
                        key={index}
                        data={data}
                        updateList={updateList}
                        setUpdateList={setUpdateList}
                    />
                );
            })
        ) : (
            <h2 style={{ textAlign: "center" }}>No notes to show</h2>
        );

    return (
        <>
            <Header />
            <section className="headSection">
                <CreateNote
                    updateList={updateList}
                    setUpdateList={setUpdateList}
                />
                <div className="noteSection">
                    <h1>Notes</h1>
                    <div className="notesList">
                        {token ? (
                            notesCards
                        ) : (
                            <h2 style={{ textAlign: "center " }}>
                                Login First!
                            </h2>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Homepage;
