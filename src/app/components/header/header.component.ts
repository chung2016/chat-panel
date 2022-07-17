import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() minimize = new EventEmitter();
  @Output() close = new EventEmitter();

  faComments = faComments

  constructor() { }

  ngOnInit(): void {
  }

}
