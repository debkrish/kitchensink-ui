import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../shared/services/notification.service';

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
  MatIconModule,
RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  username = '';
  password = '';
  error = '';
  hidePassword = true; // <-- controls visibility toggle
  private returnUrl: string = '/members';

  constructor(private auth: AuthService, private route: ActivatedRoute, private notify: NotificationService) {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/members';

// success message from registration redirect
       if (params['registered'] === 'true' && params['message']) {
        this.notify.success(params['message']);
      }
    });
     
    
  }

  onLogin() {
    this.auth.login(this.username, this.password, this.returnUrl).subscribe({
      error: (err) => {
        if (err.error && err.error.error) {
        this.error = err.error.error;
      } else {
        // fallback in case backend didn’t send structured error
        this.error = 'Login failed. Please try again.';
      }
      }
    });
  }
}
