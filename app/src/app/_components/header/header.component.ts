import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services';
import { Result } from '../../_models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.authService.validateToken()
      .subscribe((res: Result) => {
        if (res.success) {
          this.authService.currentUser = res.data;
        }
      });
    }
  }

}
