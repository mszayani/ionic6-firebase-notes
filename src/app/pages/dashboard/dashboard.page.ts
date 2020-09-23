import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNotePage } from '../notes/add-note/add-note.page';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
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
