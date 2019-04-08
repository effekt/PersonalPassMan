import { Component, OnInit } from '@angular/core';
import { PasswordsService, QuoteService } from 'src/app/_services';
import { Result, Password } from 'src/app/_models';

@Component({
  selector: 'app-password-list',
  templateUrl: './password-list.component.html',
  styleUrls: ['./password-list.component.css']
})
export class PasswordListComponent implements OnInit {
  pass: Password = new Password;
  checkPass: string = "";
  matchCount = null;

  constructor(private passService: PasswordsService, private quoteService: QuoteService) { }

  ngOnInit() {
    this.passService.get().subscribe((res: Result) => {
      this.passService.encPasses = res.data;
      this.passService.unPasses = res.data;
    });
  }

  addPass() {
    this.passService.add(this.pass).subscribe((res: Result) => {
      this.passService.encPasses.push(res.data);
      this.passService.unencrypt();
    })
  }

  pwnedPass() {
    let pwnedPass = this.passService.checkPass(this.checkPass);
    pwnedPass.obs.subscribe(res => {
      let pws = res.split('\n').map(pw => {
        return pw.split(':')
      })
      let match = pws.find(pw => (pwnedPass.pass as string).toUpperCase().includes(pw[0]));
      if (match) {
        this.matchCount = ` has been seen ${match[1]} times in dumps.`;
      } else {
        this.matchCount = " has never been seen in a dump."
      }
    });
  }

}
