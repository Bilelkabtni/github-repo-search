import {Component, Input, OnInit} from '@angular/core';
import {Items} from '@interfaces/items.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() searchResult: Items[] = [];
  constructor() {
  }

  ngOnInit(): void {
  }

}
