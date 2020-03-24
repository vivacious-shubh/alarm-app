import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmsComponent } from './alarms.component';
import {TabViewModule} from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ChartModule} from 'primeng/chart';
import { DataHandlerService } from './../data-handler.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('AlarmsComponent', () => {
  let component: AlarmsComponent;
  let fixture: ComponentFixture<AlarmsComponent>;
  let messageService: MessageService;
  let dataHandlerService: DataHandlerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TabViewModule,
        ButtonModule,
        DropdownModule,
        FormsModule,
        ToastModule,
        TableModule,
        ChartModule,
        HttpClientTestingModule
      ],
      declarations: [ AlarmsComponent ],
      providers: [
        { provide: MessageService, useClass: MessageService },
        { provide: DataHandlerService, useClass: DataHandlerService },
        { provide: HttpClient, useClass: HttpClient }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmsComponent);
    messageService = TestBed.get(MessageService);
    dataHandlerService = TestBed.get(DataHandlerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`on calling 'menuOptionChanged', should call showMessage`, () => {
    const mockParam = {
      value: {
        name: ''
      }
    }
    spyOn(component, 'showMessage');
    component.menuOptionChanged(mockParam);
    expect(component.showMessage).toHaveBeenCalled();
  });

  it(`on calling 'showMessage', should show message in toastr`, () => {
    spyOn(messageService, 'add');
    component.showMessage('');
    expect(messageService.add).toHaveBeenCalled();
  });

  it(`on calling 'clear', should clear the toastr`, () => {
    spyOn(messageService, 'clear');
    component.clear();
    expect(messageService.clear).toHaveBeenCalled();
  });

  it(`on calling 'onReject', should close the promt box`, () => {
    spyOn(messageService, 'clear');
    component.onReject();
    expect(messageService.clear).toHaveBeenCalled();
  });

  it(`on calling 'onLogout', should promt a confirm box to user`, () => {
    spyOn(messageService, 'add');
    component.onLogout();
    expect(messageService.add).toHaveBeenCalled();
  });

  it(`on calling 'getClass()', if severity is 'Critical', should return appropiate class`, () => {
    const mockParam = {
      'condition-severity': 'CRITICAL'
    }
    const retVal = component.getClass(mockParam);
    expect(retVal).toBe('critical');
  });

  it(`on calling 'getClass()', if severity is 'MAJOR', should return appropiate class`, () => {
    const mockParam = {
      'condition-severity': 'MAJOR'
    }
    const retVal = component.getClass(mockParam);
    expect(retVal).toBe('major');
  });

  it(`on calling 'getClass()', if severity is 'MINOR', should return appropiate class`, () => {
    const mockParam = {
      'condition-severity': 'MINOR'
    }
    const retVal = component.getClass(mockParam);
    expect(retVal).toBe('minor');
  });

  it(`on calling 'getClass()', if severity is 'WARNING', should return appropiate class`, () => {
    const mockParam = {
      'condition-severity': 'WARNING'
    }
    const retVal = component.getClass(mockParam);
    expect(retVal).toBe('warning');
  });

  it(`on calling 'getClass()', if severity is 'Default', should return appropiate class`, () => {
    const mockParam = {
      'condition-severity': 'def'
    }
    const retVal = component.getClass(mockParam);
    expect(retVal).toBe('default');
  });
});
