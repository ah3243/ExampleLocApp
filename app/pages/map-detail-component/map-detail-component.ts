import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Import service
import { SqlService } from '../../providers/sql-service/sql-service';

@Component({
  templateUrl: 'build/pages/map-detail-component/map-detail-component.html',
})
export class MapDetailComponentPage {
  public title: string;
  public itemId: number;

  constructor(public navCtrl: NavController, params: NavParams) {
    this.itemId = params.get("itemNumber");
  }

}
