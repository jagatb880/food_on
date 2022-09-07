import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewGeographicalJourneyPage } from './view-geographical-journey.page';

describe('ViewGeographicalJourneyPage', () => {
  let component: ViewGeographicalJourneyPage;
  let fixture: ComponentFixture<ViewGeographicalJourneyPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGeographicalJourneyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewGeographicalJourneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
