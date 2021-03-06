import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperation-solde-repos',
  templateUrl: './recuperation-solde-repos.component.html',
  styleUrls: ['./recuperation-solde-repos.component.css']
})
export class RecuperationSoldeReposComponent implements OnInit {
  form: FormGroup;
  rowData: any;

  constructor(private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })


  }
  conge2: object;
  RSR: object = {
    personnel: { personnel_id: "" }
  };
  personnels: any;
  ngOnInit(): void {
    this.Rhservice.listerPersonnel().subscribe(data => {
      this.personnels = data;

    });

    this.Rhservice.listRSR().subscribe(res => {
      console.log(res);
      this.rowData = res;
    });

  }
  add() {

    console.log(this.RSR["personnel"].personnel_id);
    this.Rhservice.ajouterRSR(this.RSR, this.RSR["personnel"].personnel_id).subscribe(res => {
      if (res != null) {
        this.ngOnInit();

        console.log(res);
        console.log(this.RSR["personnel"].personnel_id);
        this._snackBar.open("Demande De recuperation Solde repos ajouté avec succés", "OK", {
          duration: 2000,
          panelClass: ["green-snackbar"]
        });
      }
      else {

        console.log(res);
        this._snackBar.open("Il existe déjà une demande avec ce personnel dans la même année", "OK", {
          duration: 2000,
          panelClass: ["green-snackbar"]
        });

      }
    });
  }

  columnRSR = [
    {
      headerName: "Num Demande",
      field: "id",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Date demandé",
      field: "datedemande",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Etat",
      field: "etat",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "prenom personnel",
      field: "p.prenom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Nom personnel",
      field: "p.nom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Solde Repos",
      field: "p.soldeRepos",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Solde Recuperer",
      field: "soldeRecuperer",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },
    {
      headerName: "Titre Annee",
      field: "titreAnnee",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    }
  ]
  localeText = {
    // Set Filter
    selectAll: 'Séléctionner tout',
    selectAllSearchResults: 'Select All Search Results',
    searchOoo: 'Chercher...',
    blanks: 'Blanks',
    noMatches: 'No matches.',

    // Number Filter & Text Filter
    filterOoo: 'Filtre...',
    equals: 'égale à',
    notEqual: 'différent à',

    // Number Filter
    lessThan: 'Less than',
    greaterThan: 'Greater than',
    lessThanOrEqual: 'Less than or equal',
    greaterThanOrEqual: 'Greater than or equal',
    inRange: 'In range',
    inRangeStart: 'à',
    inRangeEnd: 'De',

    // Text Filter
    contains: 'Contient',
    notContains: 'Ne contient pas',
    startsWith: 'Commence avec',
    endsWith: 'Se termine par',

    // Date Filter
    dateFormatOoo: 'Yyyy-mm-dd',

    // Filter Conditions
    andCondition: 'ET',
    orCondition: 'OU',

    // Filter Buttons
    applyFilter: 'Appliquer',
    resetFilter: 'Réinitialiser',
    clearFilter: 'Effacer',
    cancelFilter: 'Annuler',

    // Side Bar
    columns: 'Colonnes',
    filters: 'Filtres',

    // columns tool panel
    pivotMode: 'Pivot Mode',
    groups: 'Row Groups',
    rowGroupColumnsEmptyMessage: 'Drag here to set row groups',
    values: 'Valeures',
    valueColumnsEmptyMessage: 'Drag here to aggregate',
    pivots: 'Labels des colonnes',
    pivotColumnsEmptyMessage: 'Drag here to set column labels',

    // Header of the Default Group Column
    group: 'Groupe',

    // Other
    loadingOoo: 'Chargement...',
    noRowsToShow: 'Table vide',
    enabled: 'Activé',

    // Menu
    pinColumn: 'Pin Column',
    pinLeft: 'Pin Left',
    pinRight: 'Pin Right',
    noPin: 'No Pin',
    valueAggregation: 'Value Aggregation',
    autosizeThiscolumn: 'Autosize This Column',
    autosizeAllColumns: 'Autosize All Columns',
    groupBy: 'Group by',
    ungroupBy: 'Un-Group by',
    resetColumns: 'Reset Columns',
    expandAll: 'Expand All',
    collapseAll: 'Close All',
    copy: 'Copy',
    ctrlC: 'Ctrl+C',
    copyWithHeaders: 'Copy With Headers',
    paste: 'Paste',
    ctrlV: 'Ctrl+V',
    export: 'Export',
    csvExport: 'CSV Export',
    excelExport: 'Excel Export (.xlsx)',
    excelXmlExport: 'Excel Export (.xml)',

    // Enterprise Menu Aggregation and Status Bar
    sum: 'Sum',
    min: 'Min',
    max: 'Max',
    none: 'None',
    count: 'Count',
    avg: 'Average',
    filteredRows: 'Filtrés',
    selectedRows: 'Séléctionnés',
    totalRows: 'Toutes les lignes',
    totalAndFilteredRows: 'Lignes',
    page: 'Page',
    more: 'Plus',
    to: 'à',
    of: 'de',
    next: 'Suivant',
    last: 'Dérnier',
    first: 'Premier',
    previous: 'Précédent',

    // Enterprise Menu (Charts)
    pivotChartAndPivotMode: 'Pivot Chart & Pivot Mode',
    pivotChart: 'Pivot Chart',
    chartRange: 'Chart Range',

    columnChart: 'Column',
    groupedColumn: 'Grouped',
    stackedColumn: 'Stacked',
    normalizedColumn: '100% Stacked',

    barChart: 'Bar',
    groupedBar: 'Grouped',
    stackedBar: 'Stacked',
    normalizedBar: '100% Stacked',

    pieChart: 'Pie',
    pie: 'Pie',
    doughnut: 'Doughnut',

    line: 'Line',

    xyChart: 'X Y (Scatter)',
    scatter: 'Scatter',
    bubble: 'Bubble',

    areaChart: 'Area',
    area: 'Area',
    stackedArea: 'Stacked',
    normalizedArea: '100% Stacked',

    histogramChart: 'Histogram',

    // Charts
    pivotChartTitle: 'Pivot Chart',
    rangeChartTitle: 'Range Chart',
    settings: 'Settings',
    data: 'Data',
    format: 'Format',
    categories: 'Categories',
    defaultCategory: '(None)',
    series: 'Series',
    xyValues: 'X Y Values',
    paired: 'Paired Mode',
    axis: 'Axis',
    navigator: 'Navigator',
    color: 'Color',
    thickness: 'Thickness',
    xType: 'X Type',
    automatic: 'Automatic',
    category: 'Category',
    number: 'Number',
    time: 'Time',
    xRotation: 'X Rotation',
    yRotation: 'Y Rotation',
    ticks: 'Ticks',
    width: 'Width',
    height: 'Height',
    length: 'Length',
    padding: 'Padding',
    spacing: 'Spacing',
    chart: 'Chart',
    title: 'Title',
    titlePlaceholder: 'Chart title - double click to edit',
    background: 'Background',
    font: 'Font',
    top: 'Top',
    right: 'Right',
    bottom: 'Bottom',
    left: 'Left',
    labels: 'Labels',
    size: 'Size',
    minSize: 'Minimum Size',
    maxSize: 'Maximum Size',
    legend: 'Legend',
    position: 'Position',
    markerSize: 'Marker Size',
    markerStroke: 'Marker Stroke',
    markerPadding: 'Marker Padding',
    itemSpacing: 'Item Spacing',
    itemPaddingX: 'Item Padding X',
    itemPaddingY: 'Item Padding Y',
    layoutHorizontalSpacing: 'Horizontal Spacing',
    layoutVerticalSpacing: 'Vertical Spacing',
    strokeWidth: 'Stroke Width',
    offset: 'Offset',
    offsets: 'Offsets',
    tooltips: 'Tooltips',
    callout: 'Callout',
    markers: 'Markers',
    shadow: 'Shadow',
    blur: 'Blur',
    xOffset: 'X Offset',
    yOffset: 'Y Offset',
    lineWidth: 'Line Width',
    normal: 'Normal',
    bold: 'Bold',
    italic: 'Italic',
    boldItalic: 'Bold Italic',
    predefined: 'Predefined',
    fillOpacity: 'Fill Opacity',
    strokeOpacity: 'Line Opacity',
    histogramBinCount: 'Bin count',
    columnGroup: 'Column',
    barGroup: 'Bar',
    pieGroup: 'Pie',
    lineGroup: 'Line',
    scatterGroup: 'X Y (Scatter)',
    areaGroup: 'Area',
    histogramGroup: 'Histogram',
    groupedColumnTooltip: 'Grouped',
    stackedColumnTooltip: 'Stacked',
    normalizedColumnTooltip: '100% Stacked',
    groupedBarTooltip: 'Grouped',
    stackedBarTooltip: 'Stacked',
    normalizedBarTooltip: '100% Stacked',
    pieTooltip: 'Pie',
    doughnutTooltip: 'Doughnut',
    lineTooltip: 'Line',
    groupedAreaTooltip: 'Area',
    stackedAreaTooltip: 'Stacked',
    normalizedAreaTooltip: '100% Stacked',
    scatterTooltip: 'Scatter',
    bubbleTooltip: 'Bubble',
    histogramTooltip: 'Histogram',
    noDataToChart: 'No data available to be charted.',
    pivotChartRequiresPivotMode: 'Pivot Chart requires Pivot Mode enabled.',
  }
  idA: number;
  getIdA(event1) {
    this.idA = event1.data["id"];
    console.log(event1.data["id"]);
    console.log(this.idA);
  }
  AccepterDemandeRSR() {
    this.Rhservice.AccepterDemandeRSR(this.idA).subscribe(res => {
      this.ngOnInit();
      this._snackBar.open("Demande Recuperation Solde Repos est accepté", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]


      });
    });
  }

  RefusererDemandeRSR() {
    this.Rhservice.RefuserDemandeRSR(this.idA).subscribe(res => {
      this.ngOnInit();
      this._snackBar.open("Demande Recuperation Solde Repos est refusé", "OK", {
        duration: 2000,
        panelClass: ["green-snackbar"]


      });
    });
  }

}
