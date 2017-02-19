LocalForage-cordovaSQLiteDriver-TestIonic2App
=============================================

This is a sample app that demonstrates how [localForage-cordovaSQLiteDriver](https://github.com/thgreasi/localForage-cordovaSQLiteDriver) can be used in a Typescript app. If you are using Ionic v2 you should probably use ionic-storage that is a localForage wrapper.

To recreate this repo from scratch:

```bash
ionic start localForage-cordovaSQLiteDriver-TestIonic2App --v2
cd localForage-cordovaSQLiteDriver-TestIonic2App
ionic platform add android # OR ios

cordova plugin add cordova-sqlite-storage
# OR
# ionic plugin add https://github.com/litehelpers/Cordova-sqlite-storage.git

ionic run android
```
