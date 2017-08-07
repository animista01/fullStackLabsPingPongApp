import { Component } from '@angular/core';

import { LeaderboardPage } from '../leaderboard/leaderboard';
import { GamePage } from '../game/game';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = GamePage;
  tab2Root = LeaderboardPage;

  constructor() {

  }
}
