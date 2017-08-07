import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/Rx';
import { ApiProvider } from '../api/api';
import { UtilProvider } from '../../providers/util/util';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {
  _user: any;

  constructor(public api: ApiProvider, public util: UtilProvider) {}

  login(accountInfo: any) {
    let seq = this.api.post('sessions', accountInfo).map(this.extractData).share();

    seq
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if (res.access_token)
          this._loggedIn(res);
      }, err => {
        // console.error('ERROR', err);
      });

    return seq;
  }

  signup(accountInfo: any) {
    console.log(accountInfo)
    let seq = this.api.post('users', accountInfo).map(this.extractData).share();

    seq
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if (res.access_token)
          this._loggedIn(res);
      }, err => {
        // console.error('ERROR', err);
      });

    return seq;
  }

  private _loggedIn(resp) {
    console.log("I save the token in the localstorage")
    this._user = resp;
    this.util.setOneItem("token", this._user.access_token).then(() => {});
  }

  getOpponents(){
    let seq = this.api.get('users/opponents', null, true).map(this.extractData);

    return seq;
  }

  private extractData(res: Response){
    return res.json();
  }

}
