import { Component, OnInit } from '@angular/core';
import { faWindowMinimize } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-minimize-button',
  templateUrl: './minimize-button.component.html',
  styleUrls: ['./minimize-button.component.scss']
})
export class MinimizeButtonComponent implements OnInit {

  faWindowMinimize = faWindowMinimize

  constructor() { }

  ngOnInit(): void {
  }

}
