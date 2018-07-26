import * as express from 'express'
import Note from "../../common/js/Note";
import {Request, Response} from 'express';

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    try {
        // console.log(req.body);
        let message: string = req.body.message;
        let note: Note = new Note(message);
        await note.save();
        return res.status(200).send('created the note');
    }
    catch (error) {
        console.log({req: req, err: error});
        return res.status(500).send(error.message);
    };
});


router.get('/fetch/:id', async (req, res) => {
    console.log('GET handler for /fetch route.');
    res.send('GET handler for /fetch route.');
});

export default router;