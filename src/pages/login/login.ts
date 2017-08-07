import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { GamePage } from '../game/game';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private logInGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    public user: UserProvider, private formBuilder: FormBuilder) {
    this.logInGroup = this.formBuilder.group({
	    email: ['', Validators.required],
	    password: ['', Validators.required]
	  });
  }

  ionViewDidLoad() {
  }

  logIn() {
  	this.user.login(this.logInGroup.value)
    .subscribe((resp) => {
      console.log(JSON.stringify(resp, null, 2))
      this.navCtrl.push(GamePage);
    }, (err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: err.json().message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  goToSignup(){
    this.navCtrl.push("SignupPage");
  }

}
