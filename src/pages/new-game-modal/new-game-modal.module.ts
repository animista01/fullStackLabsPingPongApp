import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewGameModalPage } from './new-game-modal';

@NgModule({
  declarations: [
    NewGameModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NewGameModalPage),
  ],
})
export class NewGameModalPageModule {}
