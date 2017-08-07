import { ViewChild, Component } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { UserProvider } from '../../providers/user/user';
import { UtilProvider } from '../../providers/util/util';

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  games: any = [];
  opponents: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public game: GameProvider, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public user: UserProvider, public util: UtilProvider) {
    let loader = this.loadingCtrl.create();
    loader.present();

    game.getMineGames()
    .subscribe((resp) => {
      // console.log(JSON.stringify(resp, null, 2))
      if (resp && resp.games) {
        this.games = resp.games;
      }
    }, (err) => {});

    user.getOpponents()
    .subscribe((resp) => {
      loader.dismiss();
      // console.log(JSON.stringify(resp, null, 2))
      if (resp && resp.opponents) {
        this.opponents = resp.opponents;
      }
    }, (err) => {
      loader.dismiss();
    });
  }

  ionViewDidLoad() {
  }

  createGameModal(){
    let searchModal = this.modalCtrl.create("NewGameModalPage", { opponents: this.opponents }, { cssClass: "new-game-modal" });
    searchModal.onDidDismiss(data => {
      if (data && data.game) {
        this.games.push(data.game);
      }
    });
    searchModal.present();
  }

  signout(){
    this.user.logout()
    .then(() => {
      this.navCtrl.setRoot("LoginPage");
    });
  }

}
