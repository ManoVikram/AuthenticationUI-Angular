import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public users: any = [];

  public name: string = "";

  constructor(private api: ApiService, private auth: AuthService, private userStore: UserStoreService) { }

  ngOnInit() {
    this.api.getUsers().subscribe(res => {
      this.users = res;
    });

    this.userStore.getNameFromStore().subscribe(value => {
      var nameFromToken = this.auth.getNameFromToken();
      this.name = value || nameFromToken;
    });
  }

  logOut() {
    this.auth.logout();
  }
}
