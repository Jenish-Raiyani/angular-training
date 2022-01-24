import { Component, Input, NgModule, OnInit } from '@angular/core';


@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html'
})


export class CustomInputComponent{
  @Input('input-label') label: any;






}
