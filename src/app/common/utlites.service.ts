import { isNgContainer } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtlitesService {

  lang:any;

  constructor(public translateService: TranslateService) { }

  setDark(dark: boolean) {
    localStorage.setItem("darkMode", String(dark));
  }

  getDark() {
    return localStorage.getItem("darkMode");
  }
  setFont(maxmized: boolean) {
    localStorage.setItem("fontSize", String(maxmized));
  }

  getFont() {
    return localStorage.getItem("fontSize");
  }

  setDir(dir: string) {
    localStorage.setItem("dir", dir);
  }

  getDir() {
    return localStorage.getItem("dir");
  }

  setEnglishStyle() {
    this.translateService.use('en');
    document.body.setAttribute('dir', 'ltr')
    document.body.classList.remove('lang');
    this.setDir('ltr');
    document.getElementsByTagName("html")[0].setAttribute("lang", 'en');
    this.lang = 'en';

  }

  setArabicStyle() {
    this.translateService.use('ar');
    document.body.setAttribute('dir', 'rtl')
    document.body.classList.add('lang');
    this.setDir('rtl');
    document.getElementsByTagName("html")[0].setAttribute("lang", 'ar');
    this.lang = 'ar';


  }

  setStyleFromStorage() {
    let element = document.body;
    if (this.getDark() == 'true') {
      element.classList.toggle("dark-mode");
    } else {
      element.classList.toggle("light-mode");
    }
    if (this.getDir() == 'rtl') {
      this.setArabicStyle();
    } else {
      this.setEnglishStyle();
    }
    this.changeFont();
  }

  changeFont(clicked = false) {
    const list: any = document;
    if (this.getFont() == 'true') {
      list.querySelector("html").style.fontSize = environment.min;
    } else {
      list.querySelector("html").style.fontSize = environment.max;
    }
  }

  ToggelFont() {
    const list: any = document;
    if (list.querySelector("html").style.fontSize == environment.max) {
      list.querySelector("html").style.fontSize = environment.min;
      this.setFont(true);
    } else {
      list.querySelector("html").style.fontSize = environment.max;
      this.setFont(true);
    }
  }
}
