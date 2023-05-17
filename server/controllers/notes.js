const Note = require("../model/Note");

const getNote = async (req, res) => {
    const { userId } = req.userInfo;

    const response = await Note.findAll({ where: { userId } });

    res.status(200).json(response);
};

const getNoteById = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.userInfo;

    const response = await Note.findOne({ where: { id, userId } });

    res.status(200).json(response);
};

const createNote = async (req, res) => {
    const { userId } = req.userInfo;

    const { note } = req.body;

    const response = await Note.create({
        note,
        userId,
    });

    res.status(201).json({ msg: "Note created." });
};

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.userInfo;
    const { note } = req.body;

    const response = await Note.update({ note }, { where: { id, userId } });

    res.status(200).json({ msg: "Update successfull." });
};

const deleteNote = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.userInfo;

    const response = await Note.destroy({ where: { id, userId } });

    res.status(200).json({ msg: "Delete Successful." });
};

module.exports = {
    getNote,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
};
