import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GamePage } from '../game/game';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private signUpGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public user: UserProvider,
    private formBuilder: FormBuilder, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.signUpGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {}

  signUp() {
    let loader = this.loadingCtrl.create();
    loader.present();
    // this.signUpGroup.value.password_confirmation = this.signUpGroup.value.password;
    this.user.signup({ user: this.signUpGroup.value })
    .subscribe((resp) => {
      console.log(resp)
      if (resp.status == "User created successfully") {
        this.navCtrl.push(GamePage);
      }
    }, (err) => {
      console.log(err)
      loader.dismiss();
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
    },
    () => {
      loader.dismiss();
    });
  }
}
