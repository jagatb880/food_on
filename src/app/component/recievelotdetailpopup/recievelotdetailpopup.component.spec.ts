import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecievelotdetailpopupComponent } from './recievelotdetailpopup.component';

describe('RecievelotdetailpopupComponent', () => {
  let component: RecievelotdetailpopupComponent;
  let fixture: ComponentFixture<RecievelotdetailpopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievelotdetailpopupComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecievelotdetailpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
