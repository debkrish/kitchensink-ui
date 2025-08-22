import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-register',
  imports: [FormsModule, MatCardModule, MatInputModule, MatIconModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  username = '';
  password = '';
  message = '';
  errorMessage = '';
  hidePassword = true; // <-- controls visibility toggle
  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {   
        // Handled in AuthService via navigation
      },
      error: (err) => {
        this.errorMessage = err.status? `Registration failed: Server responded with ${err.status}`: 'Registration failed: Unknown error';
      }
    });
  }
}
