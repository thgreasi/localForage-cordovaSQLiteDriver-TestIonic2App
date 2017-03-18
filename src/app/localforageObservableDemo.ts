import localForage from 'localforage';
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { extendPrototype } from 'localforage-observable';
import { Observable } from 'rxjs/Observable';

var localforage = extendPrototype(localForage);
console.log(localforage, localforage.newObservable);

localforage.newObservable.factory = function (subscribeFn) {
    return Observable.create(subscribeFn);
};

export function simpleObservableTest() {
  try {
    localforage.defineDriver(cordovaSQLiteDriver).then(function() {
      return localforage.setDriver([
        cordovaSQLiteDriver._driver,
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE
      ]);
    }).then(function() {
      return localforage.ready();
    }).then(function() {
      var observable = localforage.newObservable();

      var subscription = observable.subscribe({
        next: function(args) {
          console.log('I observe everything', args);
          alert('I observe everything ' + JSON.stringify(args));
        },
        error: function(err) {
          console.log('Found an error!', err);
          alert('Found an error! ' + err);
        },
        complete: function() {
          console.log('Observable destroyed!');
          alert('Observable destroyed!');
        }
      });

      return localforage.setItem('testPromiseKey', 'testPromiseValue ' + (new Date()).toString()).catch(function(err) {
        alert(err);
        console.log(err);
      }).then(function(value) {
        subscription.unsubscribe();
      });
    }).catch(function(err) {
      alert(err);
      console.log(err);
    });
  } catch (e) {
    alert(e);
    console.log(e);
  }
}
