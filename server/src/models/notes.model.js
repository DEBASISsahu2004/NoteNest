const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
});

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;