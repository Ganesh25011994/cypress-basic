import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CustomLoadingService {

  isLoading: boolean = false;

  constructor(public loadingController: LoadingController) { }

  async presentLoading(msg: string, id?: string) {
    this.isLoading = true;
    return await this.loadingController
      .create({
        message: msg,
        id: id,
        spinner: 'circles',
        cssClass: 'custom-loading',
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  async dismissLoading(id?) {
    this.isLoading = false;
    if (id) {
      await this.loadingController
        .dismiss(null, '', id)
        .then(() => console.log('dismissed'));
    } else {
      await this.loadingController
        .dismiss()
        .then(() => console.log('dismissed'));
    }
  }
}
