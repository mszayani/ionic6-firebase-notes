import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Note } from 'src/app/shared/models/note';
import { NotesService } from 'src/app/shared/services/notes.service';
import { AddNotePage } from '../notes/add-note/add-note.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @Input() note: Note;
  current_date: string;
  notes: any;
  addTask: Boolean;
  myTask ='';
  isUrgent: Boolean = false;

  public newNoteForm = new FormGroup({
    note_title: new FormControl(''),
  });
  
  constructor(public modalCtrl: ModalController, private noteService: NotesService) {
    const date = new Date();
    const options = { weekday: 'long', month:'long', day:'numeric', year:'numeric' };
    
    this.current_date = date.toLocaleDateString('fr-FR', options);

   }
   createNote(data: Note){
    console.log('New note with data' + data);
    this.noteService.saveNote(data);
    this.addTask = false;
  }

  ngOnInit() {
    this.getNotes();
  }
  
  getNotes = () => this.noteService.getNotes().subscribe(
    res => (this.notes = res)
    
  )
  showForm(){
    this.addTask = !this.addTask;
    this.myTask = '';
  }
  async presentModal(){
    const modal = await this.modalCtrl.create({
      component: AddNotePage
    });
    return await modal.present();
  }
  dismiss(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
