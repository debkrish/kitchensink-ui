import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NotificationService } from '../shared/services/notification.service';

interface Member {
  id?: number;
  name: string;
  email: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
   MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,],
  templateUrl: './members.html',
  styleUrls: ['./members.scss']
})
export class Members implements OnInit {
  members: Member[] = [];
  newMember: Member = { name: '', email: '', phoneNumber: '' };

  constructor(private http: HttpClient, private notify: NotificationService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.http.get<Member[]>(`${environment.apiUrl}/api/members`).subscribe({
      next: (data) => (this.members = data),
      error: (err) => console.error('Failed to load members', err)
    });
  }

    addMember(): void {
    this.http.post<Member>(`${environment.apiUrl}/api/members`, this.newMember).subscribe({
      next: () => {
        // Refresh the whole list from backend instead of just pushing
        this.loadMembers();
        this.newMember = { name: '', email: '', phoneNumber: '' };
        this.notify.success('Member registered successfully');
      },
      error: (err: HttpErrorResponse) => {
        if (err.error?.details) {
  Object.entries(err.error.details).forEach(([field, msg]) => {
    this.notify.error(`${field}: ${msg}`);
  });
}

else{
   this.notify.error(err.error?.message || 'Something went wrong');
}
      }
    });
  }
}
