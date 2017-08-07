import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/Rx';
import { ApiProvider } from '../api/api';

@Injectable()
export class LeaderboardProvider {

  constructor(public api: ApiProvider) {
  }

  getLeaderboard(){
    let seq = this.api.get('leaderboard', null, true).map(this.extractData);

    return seq;
  }

  private extractData(res: Response){
    return res.json();
  }

}
