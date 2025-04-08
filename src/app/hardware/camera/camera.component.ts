import { Component } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/sharedModule/shared-module';
@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [CommonModule, WebcamModule, SharedModule],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss'
})
export class CameraComponent {
  private trigger: Subject<void> = new Subject<void>();

  // Observable for the webcam snapshot
  public webcamImage: WebcamImage | null = null;

  // Function to trigger the snapshot
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  // Function to handle the captured image
  public handleImage(image: WebcamImage): void {
    this.webcamImage = image;
  }

  // Observable for the trigger
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
