import Notes from '../models/notesModel.js'

export async function renderNotes(_, res) {
    try {
        const notes = await Notes.find().sort({createdAt: -1});
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch notes'});
    }
}

export async function renderNoteById(req, res) {
    try {
        const note = await Notes.findById(req.params.id);

        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch note by ID'})
    }
}

export async function createNote(req, res) {
    try {
        const {title, content, theme} = req.body;
        const createdNote = new Notes({title, content, theme});

        await createdNote.save()
        res.status(201).json(createdNote);
    } catch (error) {
        res.status(500).json({message: 'Failed to create note'});
        console.log(error)
    }
}

export async function updateNote(req, res) {
    try {
        const {title, content, theme} = req.body;
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, {title, content, theme});

        if(!updatedNote) return res.status(200).json({message: 'Note not found'});
        res.status(200).json(updatedNote)
    } catch (error) {
        res.status(500).json({message: 'Failed to update note'});
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Notes.findByIdAndDelete(req.params.id);

        if(!deletedNote) return res.status(404).json({message: 'Note not found'})
        res.status(200).json({message: 'Note deleted'});
    } catch (error) {
        res.status(500).json({message: 'Failed to delete note'});
    }
}