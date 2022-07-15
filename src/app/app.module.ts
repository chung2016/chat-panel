import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TncComponent } from './pages/tnc/tnc.component';
import { NameFormComponent } from './pages/name-form/name-form.component';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { QueuingComponent } from './pages/queuing/queuing.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { HeaderComponent } from './components/header/header.component';
import { MinimizeButtonComponent } from './components/minimize-button/minimize-button.component';
import { CloseButtonComponent } from './components/close-button/close-button.component';
import { TypeMessageComponent } from './components/type-message/type-message.component';
import { MembersBarComponent } from './components/members-bar/members-bar.component';
import { TroubleComponent } from './pages/trouble/trouble.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmLeaveChatComponent } from './components/confirm-leave-chat/confirm-leave-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    TncComponent,
    NameFormComponent,
    ChatRoomComponent,
    QueuingComponent,
    MessageBoxComponent,
    HeaderComponent,
    MinimizeButtonComponent,
    CloseButtonComponent,
    TypeMessageComponent,
    MembersBarComponent,
    TroubleComponent,
    ConfirmLeaveChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
