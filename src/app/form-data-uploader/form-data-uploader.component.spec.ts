import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDataUploaderComponent } from './form-data-uploader.component';

describe('FormDataUploaderComponent', () => {
  let component: FormDataUploaderComponent;
  let fixture: ComponentFixture<FormDataUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDataUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDataUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
