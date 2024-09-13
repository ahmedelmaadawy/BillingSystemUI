import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageReportComponent } from './storage-report.component';

describe('StorageReportComponent', () => {
  let component: StorageReportComponent;
  let fixture: ComponentFixture<StorageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
