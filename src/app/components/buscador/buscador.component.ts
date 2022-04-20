import { PieChartService } from './../../services/pie-chart.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {
  public listFiltered: string[] = [];
  public modulos = new FormControl();
  public datos = this.pieChartService.getData();
  public paisesNames: string[] = [];

  public dropdownList: any = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dataPaises: any = []; //Sustituye a "dropdownList"

  @Input() dataBuscador: any;

  constructor(
    private pieChartService: PieChartService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.dataPaises = [
      {
        id: 1,
        category: "Lithuania",
        value: 501.9
      }, {
        id: 2,
        category: "Czechia",
        value: 301.9
      }, {
        id: 3,
        category: "Ireland",
        value: 201.1
      }, {
        id: 4,
        category: "Germany",
        value: 165.8
      }, {
        id: 5,
        category: "Mexico",
        value: 200
      }, {
        id: 6,
        category: "Italy",
        value: 190.1
      }, {
        id: 7,
        category: "EUA",
        value: 165.8
      }
    ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'category',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  datosNames() {
    this.paisesNames = this.datos.map((pais: any) => pais.category);
  }

}
