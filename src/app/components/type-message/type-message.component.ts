import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-message',
  templateUrl: './type-message.component.html',
  styleUrls: ['./type-message.component.scss']
})
export class TypeMessageComponent implements OnInit {

  @Input() componentEnabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
