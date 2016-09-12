import { Component } from '@angular/core';
import {Page} from 'ionic-angular';
import {Camera} from 'ionic-native';

// import { imgLib } from '../imgLib/imgLib';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    public base64Image: string;
    public name: string;
    
  constructor() {
    this.name = "toots";
  }

  takePicture(){
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