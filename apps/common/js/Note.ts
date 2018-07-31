import {Supertype, supertypeClass, property, Persistable} from 'amorphic';

@supertypeClass
export default class Note extends Persistable(Supertype) {
    @property()
    message: string;


    constructor(message: string) {
        super();
        this.message = message;
    }

    async save() {
        let txn = this.amorphic.begin();
        this.setDirty(txn);
        await this.amorphic.commit({transaction: txn});
    }

    static async getNoteById(notesId: string) {
        return Note.persistorFetchById(notesId);
    }



    static async getAllNotes() {
        return Note.persistorFetchByQuery({});
    }


    static async findAndDeleteNoteById(notesId: string) {
        try{
            let note : Note = await Note.persistorFetchById(notesId);
            console.log(note);
            let txn = note.amorphic.begin();
            note.persistorDelete();
            await note.amorphic.commit({transaction: txn});
        } catch(error){
            console.log("error while deleting notes!");
            throw error;
        }
    }


}


