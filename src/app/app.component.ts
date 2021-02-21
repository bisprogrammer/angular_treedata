import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  gridApi: any;
  gridColumnApi: any;

  public modules: any[] = [ClientSideRowModelModule, RowGroupingModule];
  rowData: any[];
  columnDefs: any;
  defaultColDef: any;
  autoGroupColumnDef: any;
  groupDefaultExpanded: any;
  getDataPath: any;
  pagination: any;
  paginationAutoPageSize: any;
  suppressAggFuncInHeader: any;

  constructor() {
    this.rowData = [];
    this.columnDefs = [{ field: 'population' }, { field: 'base' }, { field: 'status' }];
    this.defaultColDef = { flex: 1, sortable: true, resizable: true};
    this.autoGroupColumnDef = {
      headerName: 'Наименование',
      minWidth: 300,
      cellRendererParams: { suppressCount: true },
    };
    this.groupDefaultExpanded = -1;
    this.getDataPath = function (data: any) {
      return data.path.split('/');
    };
    this.pagination = true;
    this.paginationAutoPageSize = true;
    this.suppressAggFuncInHeader = true;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  @ViewChild("cities", {static: false})
  citiesData!: ElementRef;

  ngAfterViewInit() {
    let rows = Array.from(this.citiesData.nativeElement.children[1].children);
    let newRow: any = {};
    this.rowData = [];
    rows.forEach((row: any) => {
        newRow = {
          path: `${row.children[4].textContent.trim()}/${row.children[3].textContent.trim()}/${row.children[2].textContent.trim()}`,
          population: row.children[5].textContent.trim(),
          base: row.children[6].textContent.trim(),
          status: row.children[7].textContent.trim()
        }
        this.rowData.push(newRow);
    });
    this.rowData = this.rowData.sort((valueA: any, valueB: any) => {
      let res = valueA.path == valueB.path ? 0 : valueA.path > valueB.path ? 1 : -1;
      return res;
    });
  }
}
