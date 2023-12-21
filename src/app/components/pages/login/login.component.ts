import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../../../state/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private store: Store) {}

  buttonLogin() {
    this.store.dispatch(login());
  }
}
