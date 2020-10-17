import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { secureConstants } from '../helpers/secureConstants';

@Injectable({
  providedIn: 'root'
})
export class EncryptionServiceService {

  constructor() { }

   //The set method is use for encrypt the value.
   encryptValue(value: string){
    var key = CryptoJS.enc.Utf8.parse(secureConstants.TOKEN_SECRET_KEY);
    var iv = CryptoJS.enc.Utf8.parse(secureConstants.TOKEN_SECRET_KEY);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

    //The get method is use for decrypt the value.
  decryptValue(value: string){
      var key = CryptoJS.enc.Utf8.parse(secureConstants.TOKEN_SECRET_KEY);
      var iv = CryptoJS.enc.Utf8.parse(secureConstants.TOKEN_SECRET_KEY);
      var decrypted = CryptoJS.AES.decrypt(value, key, {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });
  
      return decrypted.toString(CryptoJS.enc.Utf8);
    }
}
