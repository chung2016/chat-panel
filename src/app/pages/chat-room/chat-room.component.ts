import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('container', { static: false })
  containerEle?: ElementRef<HTMLElement>;
  messages$ = this.commonService.onChatMessages();
  myName = '';

  subs: Subscription[] = [];

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.myName = localStorage.getItem('name') || '';
  }

  ngAfterViewInit(): void {
    this.subs.push(
      this.commonService
        .onChatMessages()
        .pipe(debounceTime(100))
        .subscribe(() => {
          if (this.containerEle?.nativeElement) {
            this.containerEle.nativeElement.scrollTop =
              this.containerEle?.nativeElement.scrollHeight;
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
