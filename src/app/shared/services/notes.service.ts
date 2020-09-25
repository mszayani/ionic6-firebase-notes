import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notesCollection: AngularFirestoreCollection<Note>;

  constructor(private afStore: AngularFirestore) { 
    this.notesCollection = afStore.collection<Note>('notes');
  }
  getNotes(){
    return this.afStore.collection('notes').snapshotChanges();
  }

  getAllNotes(): Observable<Note[]> {
    return this.notesCollection
    .snapshotChanges()
    .pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.doc.data() as Note;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
        )
    );
  }

  public getOneNote(id: Note): Observable<Note> {
    return this.afStore.doc<Note>(`notes/${id}`).valueChanges();
  }

  public deleteNoteById(note: Note){
    return this.notesCollection.doc(note.id).delete();
  }

  public updateNoteById(note: Note) {
    return this.notesCollection.doc(note.id).update(note);
  }

  public saveNote(note: Note){
    const noteObj = {
      note_title: note.note_title,
      created_at: Date.now()
      
    };
    if(note.id) {
      return this.notesCollection.doc(note.id).update(noteObj);
    } else {
      return this.notesCollection.add(noteObj);
    }
  }
}
