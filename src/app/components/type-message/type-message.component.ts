import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-type-message',
  templateUrl: './type-message.component.html',
  styleUrls: ['./type-message.component.scss'],
})
export class TypeMessageComponent implements OnInit, AfterViewInit {
  @Input() componentEnabled = false;

  @ViewChild('textarea', { static: false })
  textareaEle?: ElementRef<HTMLTextAreaElement>;

  typeMessageForm = new FormGroup({
    content: new FormControl({ value: '', disabled: this.componentEnabled }),
  });

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {}

  send() {
    const contentControl = this.typeMessageForm.get('content');
    const content = contentControl?.value;
    const name = sessionStorage.getItem('name');
    if (!content || !name) {
      return;
    }
    this.socketService.sendMessage(content, name);
    this.typeMessageForm.reset();
  }

  ngAfterViewInit(): void {
    if (this.textareaEle?.nativeElement) {
      fromEvent(this.textareaEle.nativeElement, 'keydown').subscribe(
        (event: any) => {
          const keyCode = event.which || event.keyCode;
          if (keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            this.send();
          }
        }
      );
    }
  }
}
