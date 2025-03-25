import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CustomToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(
    msg: string,
    icon: string,
    position: 'top' | 'middle' | 'bottom',
  ) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: position,
      icon,
    });

    await toast.present();
  }
}
