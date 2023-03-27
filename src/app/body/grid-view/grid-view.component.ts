import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import axios from 'axios';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { UtlitesService } from 'src/app/common/utlites.service';

export interface DialogData {
  name: string;
}

/**
 * @title Dialog Overview
 */

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
  name:any;
  dataApi: any = [];
  disabledButton = true;
  item: any;
  surveys: any;
  selectedSurvey: any;
  nameData = true;
  langDir: any;
  DeleteOne = false;

  constructor
  (public dialog: MatDialog,
    public Myservice: UtlitesService ) { }

  async ngOnInit(): Promise<void> {
    await this.fetchAPI();
  }

  async fetchAPI() {
    const result = await axios
      .get("https://mocki.io/v1/02eb6d22-cf33-4669-8b2b-0512d28c29ba")
      .then((response) => {
        console.log(response.data[0])
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
    }
  }

  getJsonValue(obj: string) {
    return JSON.parse(obj);
  }

        log(item:any){
          console.log(item);
          this.disabledButton = false

          
          this.dataApi.forEach((items: { isSelected: boolean; }) => items.isSelected = false);

          this.name = item.SurveyName
          item.isSelected = true;
          this.nameData = false;
        }

        openDialog(): void {
          const dialogRef = this.dialog.open(EditDialogComponent, {
            width: '40vw', height: 'auto',
            data: {name: this.name}
          });

          dialogRef.afterClosed().subscribe(result => {
            this.name = result;
          });
        }

        DeleteDialog(): void {
          const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '40vw', height: 'auto',
          })

          dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            this.DeleteOne = true;
          });
        }
}