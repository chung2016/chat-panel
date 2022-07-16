import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './pages/chat-room/chat-room.component';
import { NameFormComponent } from './pages/name-form/name-form.component';
import { QueuingComponent } from './pages/queuing/queuing.component';
import { TncComponent } from './pages/tnc/tnc.component';
import { TroubleComponent } from './pages/trouble/trouble.component';

const routes: Routes = [
  // {
  //   path: 'tnc',
  //   component: TncComponent,
  //   data: { animation: 0 },
  // },
  {
    path: 'name-form',
    component: NameFormComponent,
    data: { animation: 1 },
  },
  {
    path: 'queuing',
    component: QueuingComponent,
    data: { animation: 2 },
  },
  {
    path: 'chat-room',
    component: ChatRoomComponent,
    data: { animation: 3 },
  },
  {
    path: 'trouble',
    component: TroubleComponent,
    data: { animation: 4 },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
