import localforage from 'localforage';
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

console.log(localforage, localforage.driver());
console.log(cordovaSQLiteDriver, cordovaSQLiteDriver._driver);

export function init() {
  try {
    localforage.defineDriver(cordovaSQLiteDriver).then(function() {
      return localforage.setDriver([
        cordovaSQLiteDriver._driver,
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE
      ]).then(function() {
        console.log('setDriver:' + localforage.driver());
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

init();

export var db = localforage;
