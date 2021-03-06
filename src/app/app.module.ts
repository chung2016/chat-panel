import { DoBootstrap, Injector, NgModule } from '@angular/core';
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
import { createCustomElement } from '@angular/elements';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    FontAwesomeModule,
  ],
  providers: [],
  // bootstrap: [AppComponent],
  entryComponents: [AppComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    // using createCustomElement from angular package it will convert angular component to stander web component
    const el = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    // using built in the browser to create your own custome element name
    customElements.define('chat-panel', el);
  }

  ngDoBootstrap() {}
}
