import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { NavController } from 'ionic-angular';
import { SQLite} from 'ionic-native';



@Injectable()
export class SqlService {
  public db = new SQLite();
    // public database: SQLite;


  constructor(private navCtrl: NavController) {
    this.db.openDatabase({
      name: "data.db",
      location: "default"
    }).then(() => {
      this.db.executeSql("CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, img TEXT)", {}).then((data) => {
        console.log("TABLE CREATED: " + data);
      }, (error) => {
        console.log("Unable to execute SQL" + error);
      });
    });
  }

  add(title: string, base64Img: string) {
    this.db.executeSql("INSERT INTO places (title, img) VALUES ( '" + title + "', '" + base64Img + "')", [])
      .then((data) => {
        console.log("INSERTED: " + JSON.stringify(data));
      }, (error) => {
        console.log("ERROR: " + JSON.stringify(error));
      });
  }

  // Refresh and initialise the places object
  refresh(places: Array<Object> ) {
    this.db.executeSql("SELECT * FROM places", []).then((data) => {
      places = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          places.push({ title: data.rows.item(i).title, img: data.rows.item(i).img });
        }
      }
      return(places);
    }, (error) => {
      console.log("ERROR: " + JSON.stringify(error));
    });
  }

}
