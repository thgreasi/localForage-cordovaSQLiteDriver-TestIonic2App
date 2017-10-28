// import { db as localforage } from './localforageConfig';
import { Observable } from 'rxjs/Observable';
// import 'localforage-observable';
import { db as localForage } from './localforageConfig';
import { extendPrototype } from 'localforage-observable';
const localforage = extendPrototype(localForage);

// // before localforage-observable v1.4
// import { db as localForage } from './localforageConfig';
// import { extendPrototype } from 'localforage-observable';
// var localforage = extendPrototype(localForage);

console.log(localforage, localforage.newObservable);

localforage.newObservable.factory = function (subscribeFn) {
    return Observable.create(subscribeFn);
};

export function simpleObservableTest() {
  try {
    localforage.ready().then(function() {
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
