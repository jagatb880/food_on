import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReceiveLotAddtionalDataComponent } from './receive-lot-addtional-data.component';

describe('ReceiveLotAddtionalDataComponent', () => {
  let component: ReceiveLotAddtionalDataComponent;
  let fixture: ComponentFixture<ReceiveLotAddtionalDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveLotAddtionalDataComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReceiveLotAddtionalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
