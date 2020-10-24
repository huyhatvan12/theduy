import firestore from '@react-native-firebase/firestore';
import MapService from '../services/MapService';

class Note {
  #id;
  #title;
  #content;
  #createdAt;
  static #collection = firestore().collection('notes');

  constructor (props) {
    this.#id = props?.id;
    this.#title = props?.title;
    this.#content = props?.content;
    this.#createdAt = props?.createdAt;
  }

  get id () {
    return this.#id;
  }

  get title () {
    return this.#title;
  }

  get content () {
    return this.#content;
  }

  get createdAt () {
    return this.#createdAt;
  }

  set title (title) {
    this.#title = title;
  }

  set content (content) {
    this.#content = content;
  }

  set createdAt (createdAt) {
    this.#createdAt = createdAt;
  }

  static getNotes = async () => {
    try {
      const docs = await this.#collection.get()
        .then(collection => collection.docs);

      return docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;

        return new Note(data);
      });
    } catch (e) {
      console.log(e);
    }

    return [];
  }

  async update() {
    try {
      const data = MapService.clearNull({
        title: this.#title,
        content: this.#content,
        createdAt: this.#createdAt,
      });
      
      if (!!this?.id) {
        await Note.#collection.doc(this.id).update(data);
      } else {
        this.#createdAt = Date.now();
        data.createdAt = this.#createdAt;
        await Note.#collection.add(data);
      }

      return true;
    } catch (e) {
      console.log(e);
    }

    return true;
  }

  async remove() {
    try {
      await Note.#collection.doc(this.id).delete();
      return true;
    } catch (e) {
      console.log(e);
    }

    return true;
  }
}

export default Note;