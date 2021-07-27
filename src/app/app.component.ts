import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'jsbandstore';

  constructor(private dataService: DataService) {}
  ngOnInit() {
    const potentialToken = localStorage.getItem('auth-token');
    if (potentialToken !== null) {
      this.dataService.setToken(potentialToken);
    }
  }
}
