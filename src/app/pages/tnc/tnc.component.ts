import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tnc',
  templateUrl: './tnc.component.html',
  styleUrls: ['./tnc.component.scss'],
})
export class TncComponent implements OnInit {
  tncForm = new FormGroup({
    agree: new FormControl(false),
  });

  dump = Array(1)
    .fill(`Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum minima
  facilis, dolores blanditiis inventore atque corrupti tempore asperiores iste
  quasi, corporis sit? Sapiente facilis obcaecati dolorem ut omnis cum? Sunt.`);

  constructor(private router: Router) {}

  ngOnInit(): void {}

  nextPage(): void {
    this.router.navigate(['/name-form'], { skipLocationChange: true });
  }
}
