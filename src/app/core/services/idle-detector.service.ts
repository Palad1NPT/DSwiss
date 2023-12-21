import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent, retry, tap, timeout, timer } from 'rxjs';
import { logout, userActivity } from '../../state/actions/user.actions';
import {
  selectUserActivity,
  selectUserLoggedIn,
} from '../../state/reducers/user.reducer';
import { selectIsUploading } from '../../state/reducers/file.reducer';

@Injectable({
  providedIn: 'root',
})
export class IdleDetectorService {
  private activityEvents = ['click', 'keydown'];
  private inactivityLimit = 60000 * 5;
  private isUserLoggedIn: boolean = false;
  private isUserUploading: boolean = false;

  constructor(private store: Store) {}

  start() {
    this.trackUserState();
    this.recordUserActivity();
    this.setActivityTimeout();
  }

  private trackUserState() {
    this.store
      .select(selectUserLoggedIn)
      .pipe(
        tap(isLoggedIn => {
          this.isUserLoggedIn = isLoggedIn;
        })
      )
      .subscribe();
    this.store
      .select(selectIsUploading)
      .pipe(
        tap(isUploading => {
          this.isUserUploading = isUploading;
        })
      )
      .subscribe();
  }

  private recordUserActivity() {
    this.activityEvents.map(eventType => {
      fromEvent(document, eventType).subscribe(() => {
        this.store.dispatch(userActivity({ activityType: eventType }));
      });
    });
  }

  private setActivityTimeout() {
    this.store
      .select(selectUserActivity)
      .pipe(
        timeout({
          each: this.inactivityLimit,
        }),
        retry({
          delay: () => {
            if (!this.isUserLoggedIn) return timer(1000);

            if (this.isUserUploading) {
              this.store.dispatch(userActivity({ activityType: 'upload' }));
            } else {
              this.store.dispatch(logout());
            }
            return timer(1000);
          },
        })
      )
      .subscribe();
  }
}
