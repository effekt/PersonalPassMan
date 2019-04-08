import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/_services';

@Component({
  selector: 'app-chuck-norris',
  templateUrl: './chuck-norris.component.html',
  styleUrls: ['./chuck-norris.component.css']
})
export class ChuckNorrisComponent implements OnInit {
  quote: String = '';

  constructor(private quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.get().subscribe(res => {
      this.quote = res['value'];
    })
  }

}
