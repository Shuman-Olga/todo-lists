import { db } from '../firebase';
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  updateDoc,
  addDoc,
} from 'firebase/firestore';
/**
 * CRUD
 */
class TasksDataService {
  getAll() {
    return getDocs(query(collection(db, 'tasks'), orderBy('date')));
  }
  get(id) {
    return getDoc(doc(db, 'tasks', id));
  }
  create(data) {
    return addDoc(collection(db, 'tasks'), data);
  }
  update(id, data) {
    return updateDoc(doc(db, 'tasks', id), data);
  }
  delete(id) {
    return deleteDoc(doc(db, 'tasks', id));
  }
}

export default new TasksDataService();
