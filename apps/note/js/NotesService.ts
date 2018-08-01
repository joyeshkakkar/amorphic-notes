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
            .use('/api/v1/notes', router)
            .listen(port, () => console.log(`Listening at port:  ${port}`))
    }
}


