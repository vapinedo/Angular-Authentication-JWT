import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  specialEventList: any[] = [];

  constructor(
    private eventSvc: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.eventSvc.getEvents()
    .subscribe({
      next: data => this.specialEventList = data,
      error: err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      },
      complete: () => console.log('Completed especial events request')
    })
  }

}
