import { db as localforage } from './localforageConfig';
import 'localforage-getitems';
import 'localforage-setitems';
import 'localforage-removeitems';
import 'localforage-startswith';

// // before localforage-getItems/setItems/removeItems/startsWith v1.4
// import { db as localForage } from './localforageConfig';
// import { extendPrototype } from 'localforage-getitems';
// var localforage = extendPrototype(localForage);

console.log('localforage', localforage);
console.log('localforage.getItems', localforage.getItems);
console.log('localforage.setItems', localforage.setItems);
console.log('localforage.removeItems', localforage.removeItems);
console.log('localforage.startsWith', localforage.startsWith);

var keyValuePairs = [
  { key: 'user-2-todo-4', value: 'bb44ccaa4444' },
  { key: 'user-2-todo-3', value: 'bb33ccaa3333' },
  { key: 'user-2-todo-2', value: 'bb22ccaa2222' },
  { key: 'user-2-todo-1', value: 'bb11ccaa1111' },
  { key: 'user-1-todo-4', value: '44aa4444bbcc' },
  { key: 'user-1-todo-3', value: '33aa3333bbcc' },
  { key: 'user-1-todo-2', value: '22aa2222bbcc' },
  { key: 'user-1-todo-1', value: '11aa1111bbcc' }
];

export function simplePluralOperationsTest() {
  try {
    localforage.ready()
    .then(() => localforage.setItems(keyValuePairs))
    .then(() => console.log('Done setItems'))
    .then(() => localforage.getItems([
      'user-2-todo-1',
      'user-1-todo-1',
    ]))
    .then(items => alert(`Got todo-1 items: ${Object.keys(items).map(key => `{ ${key}: ${items[key]}`).join(', ')}`))
    .then(() => localforage.removeItems([
      'user-2-todo-1',
      'user-1-todo-1',
    ]))
    .then(items => alert('Removed todo-1 items'))
    .then(() => localforage.startsWith('user-2'))
    .then(items => alert(`Got user-2 items: ${Object.keys(items).map(key => `{ ${key}: ${items[key]}`).join(', ')}`))
    .catch(function(err) {
      alert(err);
      console.log(err);
    });
  } catch (e) {
    alert(e);
    console.log(e);
  }
}
