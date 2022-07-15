import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.scss'],
})
export class NameFormComponent implements OnInit {
  nameForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

  previousPage(): void {
    this.router.navigate(['tnc']);
  }

  nextPage(): void {
    /**
     * TODO: call api send name to backend
     * if api success go to queuing page
     * otherwise go to troble page
     */
    console.log(this.nameForm.value);
  }
}
