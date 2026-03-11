import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: false
    },
}, {timestamps: true})


const Notes = mongoose.model('Notes', noteSchema);

export default Notes