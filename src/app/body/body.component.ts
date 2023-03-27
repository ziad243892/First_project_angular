import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  close: boolean = true;
  listView = false;

  constructor() { }

  async ngOnInit(): Promise<void> {
    
  }

  closeInfo() {
    this.close = !this.close
  }

}
