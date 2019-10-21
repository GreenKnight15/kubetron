/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PodListComponent } from './podList.component';

describe('PodListComponent', () => {
  let component: PodListComponent;
  let fixture: ComponentFixture<PodListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
