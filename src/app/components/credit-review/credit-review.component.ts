import { Component } from '@angular/core';
import { CameraComponent } from '../../hardware/camera/camera.component';

@Component({
  selector: 'app-credit-review',
  standalone: true,
  imports: [CameraComponent],
  templateUrl: './credit-review.component.html',
  styleUrl: './credit-review.component.scss'
})
export class CreditReviewComponent {

}
