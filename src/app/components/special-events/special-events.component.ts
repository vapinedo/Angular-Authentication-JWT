import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  specialEventList: any[] = [];

  constructor(private eventSvc: EventService) { }

  ngOnInit(): void {
    this.eventSvc.getEvents()
    .subscribe({
      next: data => this.specialEventList = data,
      error: err => console.log(err),
      complete: () => console.log('Completed especial events request')
    })
  }

}
