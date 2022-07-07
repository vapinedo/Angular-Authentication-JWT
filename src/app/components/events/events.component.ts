import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  eventList = [];

  constructor(private eventSvc: EventService) { }

  ngOnInit(): void {
    this.eventSvc.getEvents()
    .subscribe({
      next: data => this.eventList = data,
      error: err => console.log(err),
      complete: () => console.log('Completed events request')
    })
  }

}
