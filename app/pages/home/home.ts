import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {simpleTest} from '../../localforageCordovasqlitedriverDemo';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navController: NavController) {
  
  }

  testLocalForageDriver () {
  	return simpleTest();
  }
}
