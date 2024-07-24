const Notes = require("../models/notes.model");
const User = require("../models/users.model");

async function createNote(req, res) {
  const { text } = req.body;
  try {
    if(req.userEmail) return res.status(403).json({success:403, message: "You are not authorized" });
    
    const user=await User.findById(req.userId);
    if(!user) return res.status(404).json({success:404, message: "User not found" });
    
    const newNote = new Notes({
      text,
      userId: user._id,
    });

    await newNote.save();
    return res.status(201).json({success:200,data: newNote });
  } catch (err) {
    return res.status(500).json({success:500, message: `Error creating note ${err}`});
  }
}

async function getNote(req, res) {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    } else {
        return res.status(200).json(note);
    }
} catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
}
}

async function getAllNotes(req, res) {}

async function updateNotes(req, res) {}

async function deleteNote(req, res) {}

module.exports = { createNote, getNote, getAllNotes, updateNotes, deleteNote };