import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Camera, SQLite } from 'ionic-native';

import { MapPage } from '../map-page/map-page';

// Import service
import { SqlService } from '../../providers/sql-service/sql-service';

// import { imgLib } from '../imgLib/imgLib';

@Component({
    templateUrl: 'build/pages/home/home.html',
    providers:[SqlService]

})
export class HomePage {
    public places: Array<Object>

    public base64Image: string;
    public name: string;

    // Inject SqlService into constructor of page component
    constructor(private navCtrl: NavController, private platform: Platform, public sqlService: SqlService) {
        // this.sqlService = sqlService;
        
        // this.database = new SQLite();
        // this.database.openDatabase({ name: "data.db", location: "default" }).then(() => {
        //     this.refresh();
        // }, (error) => {
        //     console.log("ERROR: ", error);
        // });

        // // Instantiate name  
        // this.name = "toots";
    }

    addLoc(title: string, img: string){
        this.sqlService.add(title, img);
        this.navCtrl.push(MapPage);
    }

    takePicture() {
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
            // imageData is a base64 encoded string
            this.base64Image = "data:image/jpeg;base64," + imageData;
        }, (err) => {
            console.log(err);
        });
    }

}






