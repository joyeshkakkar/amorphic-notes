import * as express from 'express'
import * as bodyParser from 'body-parser'
import router from './NotesRouter';


export default class NotesService {
    server: express;

    constructor() {
        this.server = express();
        let port = 3014;

        this.server
            .use(bodyParser.json())// for parsing application/json
            .use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
            .use('/api/v1/notes',router)
            .listen(port, () => console.log(`Listening at port:  ${port}`))

        // this.setupRoutes();
    }

    // protected setupRoutes() {
    //
    //     this.server.post('/notes/create', async (req, res) => {
    //         try {
    //             console.log(req.body);
    //             let msg = req.body.message;
    //             let note = new Note(msg);
    //             await note.save();
    //             return res.status(200).send('saved the note');
    //         }
    //         catch (error) {
    //             console.log({req: req, err: error})
    //             return res.status(500).send(error.message);
    //         }
    //     });
    //
    //
    //     this.server.get('/notes/get/:notesId', async (req, res) => {
    //         try {
    //             console.log(req.params.notesId);
    //             let notesId = req.params.notesId;
    //             let newNote: Note = await Note.getById(notesId);
    //             return res.status(200).send(newNote);
    //         }
    //         catch (error) {
    //             console.log({req: req, err: error})
    //             return res.status(500).send(error.message);
    //         }
    //     });
    // }
}


