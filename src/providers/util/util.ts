import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

@Injectable()
export class UtilProvider {
  private token: BehaviorSubject<string>;

  constructor(private storage: Storage) {
    this.token = new BehaviorSubject('token');
  }

  setOneItem(itemName: string, itemValue: string){
    if (itemName == "token"){
      this.token.next(itemValue);
    }

    return this.storage.set(itemName, itemValue );
  }
  getItem (itemName: string){
    return this.storage.get(itemName);
  }

  setToken(user_token) {
    this.token.next(user_token);
  }


  getToken() {
    return this.token.asObservable();
  }

}
