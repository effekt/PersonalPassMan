import { Component, OnInit } from '@angular/core';
import { PasswordsService } from 'src/app/_services';

@Component({
  selector: 'app-public-key',
  templateUrl: './public-key.component.html',
  styleUrls: ['./public-key.component.css']
})
export class PublicKeyComponent implements OnInit {

  constructor(private passService: PasswordsService) { }

  ngOnInit() {
    
  }

}
