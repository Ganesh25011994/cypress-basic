import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { IconClass } from '../utility/app-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CustomAlertService {

  constructor(public alertController: AlertController) { }

  /**
   * @description Presents an alert with the specified title, subtitle, and optional message.
   * @param title - The title of the alert.
   * @param subTitle - The subtitle of the alert.
   * @param message - (Optional) The message to display in the alert.
   * @author Rajesh. S
   */
  async presentAlert(
    title: string,
    subTitle: string,
    msg?: string,
    icon?: string,
    className?: string,
  ) {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      header: '',
      subHeader: subTitle,
      message: `
        <div class="custom-alert-container">
           <ion-icon class=${className} name=${icon}></ion-icon>
          </div>
          <ion-label>${msg ? msg : ''}</ion-label>
      `,
      buttons: ['OK'],
      backdropDismiss: false,
    });
    await alert.present();
  }
  

    /**
   * @description Custom alert animation for success and warning
   * @author Sandhiya A
   */
    async presentCustomAlert(msg?: string, iconClassObj?: IconClass) {
      const alert = await this.alertController.create({
        cssClass: 'custom-alert',
        message: ` <div class="custom-alert-container">
           <ion-icon class=${iconClassObj?.className} name=${iconClassObj?.iconName}></ion-icon>
          </div>
          <ion-label>${msg ? msg : ''}</ion-label>`,
        buttons: ['OK'],
        backdropDismiss: false,
      });
      await alert.present();
    }

    warningAlert() {
      return {
        iconName: 'warning',
        className: 'icon-color',
      };
    }

    successAlert() {
      return {
        iconName: 'checkmark-circle',
        className: 'icon-tick',
      };
    }
}
