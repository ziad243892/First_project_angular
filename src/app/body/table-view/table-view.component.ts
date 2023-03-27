import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import axios from 'axios';
import { UtlitesService } from 'src/app/common/utlites.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit {

  dataApi: PeriodicElement[] = [];
  dataSource!: MatTableDataSource<any>;
  allResults: any = [];
  displayedColumns: string[] = ['SurveyName', 'START_DATE', 'END_DATE', 'SurveyPeriods'];
  searchText: any;
  events: string[] = [];
  event: string[] = [];
  dateOne: any;
  dateTwo: any;
  resetForms: any;
  pipe!: DatePipe;

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if (!event.value) {
      this.dateOne = null
      return;
    }
    this.events.push(`${event.value}`);
    this.dateOne = moment(event.value).format('l');
  }

  addEventTwo(type: string, event: MatDatepickerInputEvent<Date>) {
    if (!event.value) {
      this.dateTwo = null
      return;
    }
    this.events.push(`${event.value}`);
    this.dateTwo = moment(event.value).format('l');
  }

  constructor(
    public Myservice: UtlitesService,
    private toastr: ToastrService,
    public translateService: TranslateService
  ) {

  }

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit(): Promise<void> {
    await this.fetchAPI();
  }

  async fetchAPI() {
    const result = await axios
      .get("https://mocki.io/v1/02eb6d22-cf33-4669-8b2b-0512d28c29ba")
      .then((response) => {
        response.data[0].map((item: any) => {
          if (item.SurveyPeriods) {
            item.SurveyPeriods = this.getJsonValue(item.SurveyPeriods);
          }
          return item;
        })
        return response.data[0]
        // this.dataApi =;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    if (result) {
      this.dataApi = result;
      this.allResults = this.SortArray(result);
      this.dataSource = new MatTableDataSource(this.allResults);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getJsonValue(obj: string) {
    return JSON.parse(obj);
  }

  reset() {
    this.resetForms = document.querySelector('.filter-forms');
    this.resetForms.reset()
    this.dataSource = new MatTableDataSource(this.SortArray(this.allResults));
  }

  dateCalc() {
    let test =
      this.allResults.filter((data: any) => {
        if (data.SurveyPeriods && data.SurveyPeriods.length > 0) {
          let endDate = this.dateTwo ? new Date(this.dateTwo).getTime() : new Date().getTime();
          let startDate = this.dateOne ? new Date(this.dateOne).getTime() : new Date().getTime();
          var startTime = new Date(data.SurveyPeriods[0].START_DATE).getTime();
          var EndTime = new Date(data.SurveyPeriods[0].END_DATE).getTime();
          let result = (startDate == startTime && EndTime == endDate);
          if (result) {
            return data
          }
        }
      });

    this.dataSource.data = this.SortArray(test);

    if (moment(this.dateTwo).isBefore(this.dateOne)) {
      this.toastr.error(this.translateService.instant('body.ERRORMSG'));
    }
  }

  SortArray(array: any) {
    return array.sort((a: any, b: any) => {
      let test: any;
      if (a.SurveyPeriods && b.SurveyPeriods && a.SurveyPeriods.length > 0 && b.SurveyPeriods.length > 0) {
        test = new Date(a.SurveyPeriods[0].START_DATE).getTime() - new Date(b.SurveyPeriods[0].START_DATE).getTime()
      }
      return test
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.data.filter((data: any) => {
      data = filterValue.trim();
      data = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    })
  }
}

export interface PeriodicElement {
  SurveyName: any;
  START_DATE: any;
  END_DATE: any;
  SurveyPeriods: any;
}