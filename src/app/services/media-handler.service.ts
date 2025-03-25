import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaHandlerService {

  constructor() { }

   /**
   * @method captureImage
   * @description This function is used to get images from the camera, crop them,
   *  and return the cropped image.
   * @author Rajesh. S
   */
  //  async captureImage(profile?) {
  //   try {
  //     let coordinate: any;
  //     if (profile) {
  //       coordinate = await this.checkPermission();
  //     }
  //     // Capture image using the camera
  //     const cameraPicture = await Camera.getPhoto({
  //       resultType: CameraResultType.DataUrl,
  //       source: CameraSource.Camera,
  //       quality: 25,
  //     });
  //     const base64String: string = await this.callCropImage(
  //       cameraPicture.dataUrl,
  //     );
  //     if (base64String == 'data:,') {
  //       this.customAlert.presentCustomAlert(
  //         this.alertMessage.alertLabels.takeAgain,
  //         this.customAlert.warningAlert(),
  //       );
  //     } else if (base64String) {
  //       // return base64String.replace('data:image/jpeg;base64,', '');
  //       let FinalImgData;
  //       if (profile == 'profile') {
  //         let finalDoc: any = base64String.replace(
  //           'data:image/jpeg;base64,',
  //           '',
  //         );
  //         return (FinalImgData = {
  //           docs: finalDoc,
  //           //  latitude: "12345677",//coordinate.lat,
  //           //  longitude:"12343343", // coordinate.long
  //           latitude: coordinate.lat,
  //           longitude: coordinate.long,
  //         });
  //       } else {
  //         return (FinalImgData = base64String.replace(
  //           'data:image/jpeg;base64,',
  //           '',
  //         ));
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }
}
