import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataHandlerService } from './../data-handler.service';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.sass']
})
export class AlarmsComponent implements OnInit {
  selectedOption: any = null;
  menuOptions = [
    { name: 'First Alarm', code: 'NY' },
    { name: 'Second Alarm', code: 'RM' },
    { name: 'Third Alarm', code: 'LDN' }
  ];
  alarms:any = [];
  tabData: any = [{ 
    name: 'Alarms',
    data: [],
    highlight: true
  },{
    name: 'Node type',
    data: [],
    highlight: true
  }];
  chartData: any;

  constructor(
    private messageService: MessageService,
    private dataHandlerService: DataHandlerService
  ) { }

  ngOnInit(): void {
    this.getAlarms();
  }

  prepareTabsData(response) {
    const labels = [];
    const counts = [];
    this.tabData[0].data = response.items;
    this.tabData[1].data = [...response.items];
    this.tabData[1].data.sort((a, b) => { return a['node-type'] > b['node-type'] ? 1 : -1});
    response.facets['condition-severity'].forEach(element => {
      const filterteredData = response.items.filter((e) => {
        return e['condition-severity'] === element.key;
      })
      this.tabData.push({
        name: `${element.key} (${element.count})`,
        data: filterteredData,
        highlight: false
      })
      labels.push(element.key);
      counts.push(element.count);
    });
    this.chartData = {
      labels: labels,
      datasets: [{
        data: counts,
        backgroundColor: [
          '#e71d1d',
          '#ef8e00',
          '#ddd326'
        ],
        hoverBackgroundColor: [
          '#e71d1d',
          '#ef8e00',
          '#ddd326'
        ]
      }]
    }
  }

  getAlarms() {
    this.dataHandlerService.getAlarms().subscribe((res) => {
      this.alarms = res['items'];
      this.prepareTabsData(res);
    }, (error) => {
      // Error Implementation
    });
  }

  menuOptionChanged(e) {
    this.showMessage(`${e.value.name} is activated`);
  }

  showMessage(message) {
    this.messageService.add({ key: 'msg', severity: 'success', summary: message, detail: 'Via MessageService' });
  }

  clear() {
    this.messageService.clear();
  }

  onConfirm(){
    this.messageService.clear('c');
    window.open('', '_self', '');;
    window.close();
  }
  onReject(){
    this.messageService.clear('c');
  }

  onLogout() {
    this.messageService.add({ key: 'c', severity: 'warn', summary: 'message', detail: 'Via MessageService' });
  }

  getClass(rowData) {
    let colorClass = '';
    switch(rowData['condition-severity']){
      case 'CRITICAL':
        colorClass = 'critical';
        break;
      case 'MAJOR':
        colorClass = 'major';
        break;
      case 'MINOR':
        colorClass = 'minor';
        break;
      case 'WARNING':
        colorClass = 'warning';
        break;
      default:
        colorClass = 'default';
    }
    return colorClass;
  }

}
