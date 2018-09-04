import {Supertype, supertypeClass, property, Persistable} from 'amorphic';
import AmorphicSerializer from './AmorphicSerializer';

@supertypeClass
export default class Note extends Persistable(Supertype) {
    @property()
    message: string;

    @property()
    title: string;



    constructor(message: string, title: string) {
        super();
        this.message = message;
        this.title = title;
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
            let txn = note.amorphic.begin();
            note.persistorDelete();
            await note.amorphic.commit({transaction: txn});
        } catch(error){
            console.log("error while deleting notes!");
            throw error;
        }
    }


    static async findAndUpdateNoteById(notesId: string, message: string, title: string) {
        try{
            let note : Note = await Note.persistorFetchById(notesId);
            note.message = message;
            note.title = title;
            return note.save();
        } catch(error){
            console.log("error while updating note!");
            throw error;
        }
    }

    public serialize() {
        return JSON.parse(AmorphicSerializer.amorphicSerialize(this));
    }
}


