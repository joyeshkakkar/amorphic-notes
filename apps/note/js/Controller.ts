import { Supertype, supertypeClass, amorphicStatic } from 'amorphic';

import NotesService from './NotesService';

@supertypeClass
export class Controller extends Supertype {
  // Global properties
  async serverInit() {
    await amorphicStatic.syncAllTables();
    return new NotesService();
  }
}
