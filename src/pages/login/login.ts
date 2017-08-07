import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { TabsPage } from '../tabs/tabs';

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
    public user: UserProvider, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {
    this.logInGroup = this.formBuilder.group({
	    email: ['', Validators.required],
	    password: ['', Validators.required]
	  });
  }

  ionViewDidLoad() {
  }

  logIn() {
    let loader = this.loadingCtrl.create();
    loader.present();
  	this.user.login({ user: this.logInGroup.value })
    .subscribe((resp) => {
      loader.dismiss();
      console.log(JSON.stringify(resp, null, 2))
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      loader.dismiss();
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: err.json().errors.toString(),
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
