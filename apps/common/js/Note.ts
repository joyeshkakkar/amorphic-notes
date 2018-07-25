import { Supertype, supertypeClass, property, Persistable } from 'amorphic';

@supertypeClass
export default class Note extends Persistable(Supertype) {
  @property()
  message: string;
  id: number;


  constructor(message: string) {
    super();
    this.message = message;
  }

  async save() {
    let txn = this.amorphic.begin();
    this.setDirty(txn);
    await this.amorphic.commit({ transaction: txn });
  }
}


