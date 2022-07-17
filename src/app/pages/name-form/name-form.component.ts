import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.scss'],
})
export class NameFormComponent implements OnInit {
  nameForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private router: Router, private socketService: SocketService) {}

  ngOnInit(): void {}

  previousPage(): void {
    this.router.navigate(['tnc'], { skipLocationChange: true });
  }

  nextPage(): void {
    /**
     * call connect socket and send name to backend
     */
    this.nameForm.disable();
    localStorage.setItem('name', this.nameForm.value.name);
    this.socketService.connect(this.nameForm.value.name);
  }
}
