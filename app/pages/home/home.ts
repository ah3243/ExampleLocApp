import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, SQLite } from 'ionic-native';

import { MapPage } from '../map-page/map-page';

// Import service
import { SqlService } from '../../providers/sql-service/sql-service';

@Component({
    templateUrl: 'build/pages/home/home.html'

})

export class HomePage {
    public places: Array<Object>

    public base64Image: string;
    public name: string;

    // Inject SqlService into constructor of page component
    public constructor(private navCtrl: NavController, private sqlService: SqlService) {
        this.places = [];
    }

    public addLoc(title: string, img: string){
        this.sqlService.add(title, img)
            .then((result)=>{
                console.log("added Data: ", result);
                this.navCtrl.push(MapPage);
            }, (error) => { console.log("ERROR: ", error)});
    }

    public takePicture() {
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






