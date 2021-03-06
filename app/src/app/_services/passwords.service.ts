import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Password } from '../_models';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PasswordsService {
  encKey: string = '';
  encPasses: Password[];
  unPasses: Password[];

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get('http://ec2-13-59-94-151.us-east-2.compute.amazonaws.com/api/password');
  }

  add(pass: Password) {
    pass.website = this.encValue(pass.website);
    pass.password = this.encValue(pass.password);
    pass.userName = this.encValue(pass.userName);
    return this.http.post('http://ec2-13-59-94-151.us-east-2.compute.amazonaws.com/api/password', pass);
  }

  unencrypt() {
    this.unPasses = this.encPasses;
    this.unPasses = this.encPasses.map(pass => {
      try {
        return {
          website: CryptoJS.AES.decrypt(pass.website, this.encKey).toString(CryptoJS.enc.Utf8),
          userName: CryptoJS.AES.decrypt(pass.userName, this.encKey).toString(CryptoJS.enc.Utf8),
          password: CryptoJS.AES.decrypt(pass.password, this.encKey).toString(CryptoJS.enc.Utf8),
          createdOn: pass.createdOn
        }
      } catch(ex) {
        return {
          website: pass.website,
          userName: pass.userName,
          password: pass.password,
          createdOn: pass.createdOn
        }
      }
    });
  }

  encValue(val) {
    return CryptoJS.AES.encrypt(val, this.encKey).toString();
  }

  checkPass(pass) {
    pass = CryptoJS.SHA1(pass).toString();
    return { obs: this.http.get('https://api.pwnedpasswords.com/range/' + pass.substr(0, 5), {responseType: 'text'}), pass: pass };
  }
}
