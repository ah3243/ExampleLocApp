import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar, SQLite } from 'ionic-native';

import { HomePage } from './pages/home/home';
import { MapPage }  from './pages/map-page/map-page';
import { MapDetailComponentPage } from './pages/map-detail-component/map-detail-component';

@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
    rootPage: any = MapPage;

    constructor(public platform: Platform) {
        platform.ready().then(() => {
            StatusBar.styleDefault();

            // Create database if not already created
            let db = new SQLite();
            db.openDatabase({
                name: "data.db",
                location: "default"
            }).then(() => {
                db.executeSql("CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, img TEXT)", {}).then((data) => {
                    console.log("TABLE CREATED: " + data);
                }, (error) => {
                    console.log("Unable to execute SQL" + error);
                });
            }, (error) => {
                console.log("Unable to open db: " + error);
            });
        });
    }
}

ionicBootstrap(MyApp);
