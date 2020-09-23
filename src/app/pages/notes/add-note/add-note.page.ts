import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
