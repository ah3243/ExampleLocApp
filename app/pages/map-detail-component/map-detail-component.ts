import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Import service
import { SqlService } from '../../providers/sql-service/sql-service';

@Component({
  templateUrl: 'build/pages/map-detail-component/map-detail-component.html',
})
export class MapDetailComponentPage {
  public title: string;
  public base64Img: string;
  public itemId: number;

  constructor(public navCtrl: NavController, params: NavParams, private sqlService: SqlService) {
    this.itemId = params.get("itemNumber");
  }

  public ionViewDidEnter(){
    console.log('Entering map-detail Page');
    this.load();
  }

  public load(){
    this.sqlService.locDetail(this.itemId).then((results) => {
      this.title = results[0].title;
      this.base64Img = results[0].img;
      console.log('Detail Loaded ' + this.title);     
    }, (error) => {
      console.log('Error loading detail: '+ error );
    });
  }
}
