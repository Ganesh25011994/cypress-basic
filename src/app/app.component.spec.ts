import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentFixture, fakeAsync, tick} from '@angular/core/testing'
import { ProductsService } from './services/products.service';
import { Component } from '@angular/core';
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

it ("hi my first test",() =>{
  const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // let result = app.check()
    // expect(result).toEqual('good');
})
});
