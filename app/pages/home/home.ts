import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Camera, SQLite } from 'ionic-native';


import { MapPage } from '../map-page/map-page';

// import { imgLib } from '../imgLib/imgLib';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    public database: SQLite;
    public places: Array<Object>;

    public base64Image: string;
    public name: string;

    constructor(private navCtrl: NavController, private platform: Platform) {
        this.database = new SQLite();
        this.database.openDatabase({ name: "data.db", location: "default" }).then(() => {
            this.refresh();
        }, (error) => {
            console.log("ERROR: ", error);
        });

        // Instantiate name  
        this.name = "toots";
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

    public add(title: string, base64Img: string) {
        this.database.executeSql("INSERT INTO places (title, img) VALUES ( '" + title + "', '" + base64Img + "')", [])
            .then((data) => {
                console.log("INSERTED: " + JSON.stringify(data));
                this.navCtrl.push(MapPage);
            }, (error) => {
                console.log("ERROR: " + JSON.stringify(error));
            });
    }

    // Refresh and initialise the places object
    public refresh() {
        this.database.executeSql("SELECT * FROM places", []).then((data) => {
            this.places = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    this.places.push({ title: data.rows.item(i).title, img: data.rows.item(i).img });
                }
            }
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });
    }











}






