import localforage from 'localforage';
import cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

console.log(localforage, localforage.driver());
console.log(cordovaSQLiteDriver, cordovaSQLiteDriver._driver);

export function simpleTest() {
  try {
    localforage.defineDriver(cordovaSQLiteDriver).then(function() {
      return localforage.setDriver([
        cordovaSQLiteDriver._driver,
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE
      ]);
    }).then(function() {
      if (localforage.driver() !== cordovaSQLiteDriver._driver) {
        console.log('Initial driver', localforage.driver());
        alert('Initial driver: '+ localforage.driver());
      }
      return localforage.setItem('testPromiseKey', 'testPromiseValue ' + (new Date()).toString());
    }).then(function() {
      return localforage.getItem('testPromiseKey');
    }).then(function(value) {
      alert(localforage.driver() + ' getItem: ' + value);
    }).catch(function(err) {
      alert(err);
      console.log(err);
    });
  } catch (e) {
    alert(e);
    console.log(e);
  }
}

// export function perfTest() {
//   var items = [];
//   var output = document.querySelector('#cordovaSQLiteDriver-output');

//   for (var i = 0; i < 200; i++) {
//     items.push({
//       key: 'key' + i,
//       value: 'value' + i
//     });
//   }

//   var t0 = +new Date();

//   function timeAddAndRemove() {
//     window.driverErrors = window.driverErrors || {};
//     var driverErrors = window.driverErrors;
//     var driverName = localforage.driver();

//     t0 = +new Date();
//     return Promise.all(items.map(function(item){
//       return localforage.setItem(item.key, item.value);
//     })).then(function(){
//       return Promise.all(items.map(function(item){
//         return localforage.getItem(item.key);
//       }));
//     }).then(function(results){
//       var t1 = +new Date();
//       driverErrors[driverName] = driverErrors[driverName] || [];
//       for (var i = 0; i < results.length; i++) {
//         if (results[i] !== 'value' + i) {
//           driverErrors[driverName].push({
//             i: i,
//             value: results[i]
//           });
//         }
//       }
//       var msg = driverName + ' Time: ' + (t1 - t0);
//       if (driverErrors[driverName] && driverErrors[driverName].length) {
//         msg += ', Errors: ' + driverErrors[driverName].length;
//       }
//       // alert(msg);
//       console.log(msg);
//       if (output)  {
//         output.innerHTML += msg + '<br />';
//       }
//     });
//   }

//   localforage.setDriver(cordovaSQLiteDriver._driver).then(function() {
//     if (output)  {
//       output.innerHTML = 'Started perf test at: ' + (new Date()).toString() + '<br />';
//     }
//     return localforage.clear();
//   }).then(timeAddAndRemove).then(function(){
//     return localforage.setDriver([
//         // localforage.INDEXEDDB,
//         localforage.WEBSQL,
//         localforage.LOCALSTORAGE
//     ]).then(function(){
//       return localforage.clear();
//     });
//   }).then(timeAddAndRemove);

// }
