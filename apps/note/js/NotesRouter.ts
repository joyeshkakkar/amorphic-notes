import * as express from 'express'
import Note from "../../common/js/Note";
import {Request, Response} from 'express';

const notesRouter = express.Router();

notesRouter.post('/create', async (req: Request, res: Response) => {
    try {
        let message: string = req.body.message;
        let title: string = req.body.title;
        let note: Note = new Note(message, title);
        await note.save();
        return res.status(200).send('note created');
    } catch (error) {
        // console.log({req: req, err: error});
        return res.status(500).send(error.message);
    }
    ;
});


notesRouter.get('/get/:id', async (req: Request, res: Response) => {
    try {
        // console.log('GET handler for /get/:id route');
        let notesId: string = req.params.id;
        // console.log(`notesId ${notesId}`);
        let note: Note = await Note.getNoteById(notesId);
        return res.status(200).json(note.serialize());
    } catch (error) {
        // console.log(error);
        return res.status(500).send(error.message);
    }
});


notesRouter.get('/getAll', async (req: Request, res: Response) => {
    try {
        // console.log('GET handler for /getAll route');
        let notesArray: Note[] = await Note.getAllNotes();
        const notes =
        notesArray.map(note =>
                note.serialize()
        );
        return res.status(200).json(notes);
    } catch (error) {
        // console.log(error);
        return res.status(500).send(error.message);
    }
});


notesRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        // console.log('Delete handler for /delete/:id route');
        let notesId: string = req.params.id;
        // console.log(`notesId ${notesId}`);
        await Note.findAndDeleteNoteById(notesId);
        return res.status(200).send('Deleted note.');
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
});


notesRouter.put('/update/:id', async (req: Request, res: Response) => {
    try {
        // console.log('Put handler for /update/:id route');
        let notesId: string = req.params.id;
        let message: string = req.body.message;
        let title: string = req.body.title;
        // console.log(`notesId ${notesId}`);
        // console.log(`message ${message}`);
        await Note.findAndUpdateNoteById(notesId,message, title);
        return res.status(200).send('Updated note.');
    } catch (error) {
        // console.log(error);
        return res.status(500).send(error.message);
    }
});

export default notesRouter;