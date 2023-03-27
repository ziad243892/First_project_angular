import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtlitesService } from '../common/utlites.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name = 'Ziad';
  lang = 'en';
  darkMode = 'dark_mode';



  supportLanguages = ['en', 'ar'];

  constructor(public translateService: TranslateService, public utlitesService: UtlitesService) {
    this.setDesign()
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang(this.lang);

    // const browserLang: any = this.translateService.getBrowserLang();
    this.translateService.use(this.lang)
    
  }

  ngOnInit(): void {
    
  }
  selectLang() {

    if (this.lang === 'en') {
      this.translateService.use('ar');
      this.lang = 'ar';
      this.utlitesService.setArabicStyle();
    } else if (this.lang === 'ar') {
      this.lang = 'en';
      this.utlitesService.setEnglishStyle();
    }

  }

  darkTheme() {
    let element = document.body;
    element.classList.toggle("dark-mode");

    if (this.darkMode === 'dark_mode') {
      this.darkMode = 'light_mode'
      this.utlitesService.setDark(false);
    } else if (this.darkMode === 'light_mode') {
      this.darkMode = 'dark_mode'
      this.utlitesService.setDark(true);
    }
  }
  fontSize() {
    this.utlitesService.ToggelFont();
  }


  setDesign() {
    this.darkMode = this.utlitesService.getDark() == 'true' ? 'dark_mode' : 'light_mode';
    this.lang = this.utlitesService.getDir() == "rtl" ? "ar" : "en";
    this.utlitesService.setStyleFromStorage();
  }

}
