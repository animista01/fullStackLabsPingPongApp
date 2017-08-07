import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ToastController } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-new-game-modal',
  templateUrl: 'new-game-modal.html',
})
export class NewGameModalPage {
  opponents: any;
  private createGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public game: GameProvider, public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder, private viewCtrl: ViewController, public toastCtrl: ToastController) {
    this.opponents = navParams.data.opponents;

    this.createGroup = this.formBuilder.group({
      user_score: ['', Validators.required],
      opponent_id: ['', [Validators.required]],
      opponent_score: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  createGame(){
    let loader = this.loadingCtrl.create();
    loader.present();
    this.game.createGame({ game: this.createGroup.value })
    .subscribe((resp) => {
      loader.dismiss();
      console.log(JSON.stringify(resp, null, 2))
      if (resp.game) {
        this.viewCtrl.dismiss({ game: resp.game });
      }
      // this.games = resp.
    }, (err) => {
      loader.dismiss();
      console.log(err)
      if (err.json().errors) {
        console.log(err.json().errors.toString())
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: err.json().errors.toString(),
          duration: 4000,
          position: 'top'
        });
        toast.present();
      }
    });
  }

}
