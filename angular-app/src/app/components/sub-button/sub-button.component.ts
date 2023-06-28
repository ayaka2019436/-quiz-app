import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-sub-button',
  templateUrl: './sub-button.component.html',
  styleUrls: ['../button/button.component.scss', './sub-button.component.scss'],
})
export class SubButtonComponent extends ButtonComponent implements OnInit {}
