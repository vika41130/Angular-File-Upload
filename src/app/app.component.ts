import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  images: any[] = []
  // images: Observable<{}[]>;

  constructor(fb: AngularFireDatabase) {
    fb.list('/images').valueChanges()
    .subscribe(img => {
      this.images.push(img)
      console.log(img)
    })
  }
}
