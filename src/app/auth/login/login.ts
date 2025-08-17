import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
      MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  MatIconModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  username = '';
  password = '';
  error = '';
  hidePassword = true; // <-- controls visibility toggle
  private returnUrl: string = '/members';

  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/members';
    });
  }

  onLogin() {
    this.auth.login(this.username, this.password, this.returnUrl).subscribe({
      error: () => this.error = 'Invalid username or password'
    });
  }
}
