import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiProvider } from '../api/api';

/*
  Generated class for the GameProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GameProvider {

  constructor(public api: ApiProvider) {}

  createGame(params){
    let seq = this.api.post('games', params, true).map(this.extractData);
    return seq;
  }

  getMineGames(){
    let seq = this.api.get('games', null, true).map(this.extractData);

    return seq;
  }

  private extractData(resp: Response){
    return resp.json();
  }
}
