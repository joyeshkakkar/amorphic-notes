import * as express from 'express'
import Note from "../../common/js/Note";
import {Request, Response} from 'express';

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    try {
        let message: string = req.body.message;
        let note: Note = new Note(message);
        await note.save();
        return res.status(200).send('created the note');
    } catch (error) {
        console.log({req: req, err: error});
        return res.status(500).send(error.message);
    }
    ;
});


router.get('/get/:id', async (req: Request, res: Response) => {
    try {
        console.log('GET handler for /get/:id route');
        let notesId: string = req.params.id;
        console.log(`notesId ${notesId}`);
        let note: Note = await Note.getNoteById(notesId);
        return res.status(200).send(note.message);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
});


router.get('/getAll', async (req: Request, res: Response) => {
    try {
        console.log('GET handler for /getAll route');
        let notes: Note[] = await Note.getAllNotes();
        notes.forEach(note => {
                console.log(note.message);
            }
        );
        return res.status(200).send("Got all notes.");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
});


router.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        console.log('Delete handler for /delete/:id route');
        let notesId: string = req.params.id;
        console.log(`notesId ${notesId}`);
        await Note.findAndDeleteNoteById(notesId);
        return res.status(200).send('Deleted note.');
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
});


router.put('/update/:id', async (req: Request, res: Response) => {
    try {
        console.log('Put handler for /update/:id route');
        let notesId: string = req.params.id;
        let message: string = req.body.message;
        console.log(`notesId ${notesId}`);
        console.log(`message ${message}`);
        await Note.findAndUpdateNoteById(notesId,message);
        return res.status(200).send('Updated note.');
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
});


export default router;