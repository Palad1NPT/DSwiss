import { IdleDetectorService } from './core/services/idle-detector.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'DSwiss';

  constructor(private idleDetector: IdleDetectorService) {
    this.idleDetector.start();
  }
}
