import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLite} from 'ionic-native';

@Injectable()
export class SqlService {
  private db: SQLite;
  private isOpen: boolean;

  public constructor() {
    if(!this.isOpen){
      this.db = new SQLite();
      this.db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        this.db.executeSql("CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, img TEXT)", []).then((data) => {
          console.log("TABLE CREATED: " + data);
        }, (error) => {
          console.log("Unable to execute SQL" + error);
        });
        this.isOpen=true;
      });
    }
  }

  public add(title: string, base64Img: string) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("INSERT INTO places (title, img) VALUES ( '"+ title +"', '"+ base64Img +"')", [])
        .then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
    });
  }

  // Clear all Locations
  public clear(){
    return new Promise((resolve, reject) => {
      this.db.executeSql("DELETE FROM places", [])
        .then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
    });
  }

  // Remove individual Location
  public remove(id: number){
    return new Promise((resolve, reject) => {
      this.db.executeSql("DELETE FROM places WHERE id = "+ id +";", [])
        .then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
    });
  }

  // Refresh and initialise the places object
  public refresh() {
    return new Promise((resolve, reject) => {
        this.db.executeSql("SELECT * FROM places", []).then((data) => {
          let places = [];
          if (data.rows.length > 0) {
            console.log('number of rows: ' + data.rows.length);
            for (var i = 0; i < data.rows.length; i++) {
              console.log('Anotherone bites the dust..'+ data.rows.item(i).title);
              places.push({ 
                id: data.rows.item(i).id,
                title: data.rows.item(i).title, 
                img: data.rows.item(i).img 
              });
            }
          }
          resolve(places);
        }, (error) => {
          reject(error);
        });
      }
    );
  }
}
