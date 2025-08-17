import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';
  error = '';
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
