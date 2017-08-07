import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LeaderboardProvider } from '../../providers/leaderboard/leaderboard';

@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {
  leaderboard: any = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public leaderboardProv: LeaderboardProvider, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {}

  ionViewWillEnter(){
    let loader = this.loadingCtrl.create();
    loader.present();

    this.leaderboardProv.getLeaderboard()
    .subscribe((resp) => {
      loader.dismiss();
      if (resp && resp.leaderboard) {
        this.leaderboard = resp.leaderboard;
      }
    }, (err) => { loader.dismiss(); });
  }
}
