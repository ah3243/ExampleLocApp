import { Component } from '@angular/core';
import { ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar, SQLite } from 'ionic-native';

import { MapPage }  from './pages/map-page/map-page';
import { SqlService } from './providers/sql-service/sql-service';

@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>',
    // Declare services
    providers: [ SqlService ]
})
export class MyApp {
    rootPage: any = MapPage;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            StatusBar.styleDefault();
        });
    }
}

ionicBootstrap(MyApp);
