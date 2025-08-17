import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Member {
  id?: number;
  name: string;
  email: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './members.html',
  styleUrls: ['./members.css']
})
export class Members implements OnInit {
  members: Member[] = [];
  newMember: Member = { name: '', email: '', phoneNumber: '' };

  constructor(private http: HttpClient) {}

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
      },
      error: (err) => console.error('Failed to add member', err)
    });
  }
}
