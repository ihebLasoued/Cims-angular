import { Component, OnInit, Inject, Input } from '@angular/core';
import { RHService } from 'app/services/RH/rhservice.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { MomentUtcDateAdapter } from "../../chef-service-layout/AffectationsPartiellesCS/datePicker";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css'],
  providers: [

    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
    { provide: DatePipe }

  ]
})
export class AbsenceComponent implements OnInit {

  constructor(private Rhservice: RHService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) { }
  addpers: boolean;
  personnels: any;
  ngOnInit(): void {
    this.addpers = false;
    /* this.Rhservice.listerPersonnel().subscribe(data => {
       this.personnels = data;
       console.dir(data);
 
     });*/
  }
  absence: object = {
    datedujour: "",
    personnel: { personnel_id: "" }
  };
  public d: any;
  rowData: any;
  rowData1: any;
  id: number;
  add() {
    if (this.absence["personnel"].personnel_id != "") {
      this.d = this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd');
      console.log(this.d);
      this.Rhservice.ajouterAbsence(this.absence["personnel"].personnel_id, this.d).subscribe(res => {
        console.log(res);
        this.Rhservice.getListeAbsenceParDate(this.d).subscribe(res => {
          var y: any = res;
          this.rowData = y;
        });
        this.Rhservice.getPersonnelnonAbsent(this.d).subscribe(res => {
          var y: any = res;
          this.rowData1 = y;
        });

        this._snackBar.open("Personnel ajouté au liste d'absences", "OK", {
          duration: 2000,
          panelClass: ["green-snackbar"]

        });
      });
    }
    else {
      this._snackBar.open(
        "Veuillez Insérer nom Personnel ",
        "OK",
        {
          duration: 2000,
          panelClass: ["red-snackbar"]
        }
      );
    }
  }
  displayAbsence() {
    this.addpers = true;
  }
  cancel() {
    this.addpers = false;
  }
  dateSelect: any;
  onOptionsSelected() {
    console.log("ggggg");
    this.d = this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd')
    console.log("ggggg");
    this.Rhservice.getListeAbsenceParDate(this.d).subscribe(res => {
      var y: any = res;
      this.rowData = y;
    });
    this.Rhservice.getPersonnelnonAbsent(this.d).subscribe(res => {
      var y: any = res;
      this.rowData1 = y;
    });
  }
  getListeAbsence() {
    this.d = this.datePipe.transform(this.absence["datedujour"], 'yyyy-MM-dd');
    this.Rhservice.getListeAbsenceParDate(this.d).subscribe(res => {
      console.log(res);
      this.rowData = res;
    });
    this.Rhservice.getPersonnelnonAbsent(this.d).subscribe(res => {
      var y: any = res;
      this.rowData1 = y;
    });
  }
  getId(event) {
    this.id = event.data["id"];
    console.log(event.data["id"]);
    console.log(this.id);
  }
  delete() {
    if (this.id != null) {
      this.dialog.open(DialogConfirmation, {
        data: this.id
      });
      this.dialog._afterAllClosed.subscribe(res => { this.getListeAbsence(); })
    } else {
      this._snackBar.open("Veuillez sélectionner le personnel à supprimer", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  delete2() {
    this.d = this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd');
    console.log(this.d);
    this.Rhservice.deletePersonnelFromListeAbsence(this.id, this.d).subscribe(res => {
      this.Rhservice.getListeAbsenceParDate(this.d).subscribe(res => {
        var y: any = res;
        this.rowData = y;
      });
      this.Rhservice.getPersonnelnonAbsent(this.d).subscribe(res => {
        var y: any = res;
        this.rowData1 = y;
      });
      console.log("Personnel Supprimé");
    });
  }
  columnDefs = [
    {
      headerName: "Nom",
      field: "nom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "Prenom",
      field: "prenom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "etat",
      field: "etat",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    }


  ]
  initD() {
    this.d = this.datePipe.transform(this.dateSelect, 'yyyy-MM-dd');
    return this.d;
  }
  public addresses: any[] = [{
    id: 1,
    personnel: ''

  }];
  addAddress() {
    this.addresses.push({
      id: this.addresses.length + 1,

      personnel: ''
    });
  }
  removeAddress(i: number) {
    this.addresses.splice(i, 1);
  }
}
@Component({
  selector: 'dialog-confirmation',
  templateUrl: 'dialog-confirmation.html',
  providers: [
    { provide: DatePipe }

  ]
})
export class DialogConfirmation implements OnInit {
  message: string;
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmation>,
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe,

    @Inject(MAT_DIALOG_DATA) public id: number) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  d: any;
  Action() {

    if (this.id != null) {
      this.d = this.datePipe.transform(new Date('2020/08/03'), 'yyyy-MM-dd');
      console.log(this.d);
      this.Rhservice.deletePersonnelFromListeAbsence(this.id, this.d).subscribe(res => {
        console.log("Personnel Supprimé");
        this.dialogRef.close();
      }, err => {
        this.message = err.error.message;
      });
    }
  }
}