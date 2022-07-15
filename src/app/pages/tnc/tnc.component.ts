import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tnc',
  templateUrl: './tnc.component.html',
  styleUrls: ['./tnc.component.scss']
})
export class TncComponent implements OnInit {
  agree = false;

  dump = Array(10).fill(`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum minima
  facilis, dolores blanditiis inventore atque corrupti tempore asperiores iste
  quasi, corporis sit? Sapiente facilis obcaecati dolorem ut omnis cum? Sunt.`)

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nextPage(): void {
    this.router.navigate(["/name-form"])
  }

}
