import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { simpleTest } from '../../app/localforageCordovasqlitedriverDemo';
import { simpleObservableTest } from '../../app/localforageObservableDemo';
import { simplePluralOperationsTest } from '../../app/localforagePluralOperationsDemo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  
  testLocalForageDriver () {
    return simpleTest();
  }

  testLocalForageObservable () {
    return simpleObservableTest();
  }

  testLocalForagePluralOperations () {
    return simplePluralOperationsTest();
  }

}
