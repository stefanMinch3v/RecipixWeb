import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAllComponent } from './recipe-all.component';

describe('RecipeAllComponent', () => {
  let component: RecipeAllComponent;
  let fixture: ComponentFixture<RecipeAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
