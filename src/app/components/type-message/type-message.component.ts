import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-type-message',
  templateUrl: './type-message.component.html',
  styleUrls: ['./type-message.component.scss'],
})
export class TypeMessageComponent implements OnInit, AfterViewInit {
  @Input() componentEnabled = false;

  faPaper = faPaperPlane

  @ViewChild('textarea', { static: false })
  textareaEle?: ElementRef<HTMLTextAreaElement>;

  typeMessageForm = new FormGroup({
    content: new FormControl({ value: '', disabled: true }),
  });

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    const { componentEnabled } = changes;
    if (componentEnabled.currentValue) {
      this.typeMessageForm.enable();
    } else {
      this.typeMessageForm.disable();
    }
  }

  send() {
    const contentControl = this.typeMessageForm.get('content');
    const content = contentControl?.value;
    const name = localStorage.getItem('name');
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
