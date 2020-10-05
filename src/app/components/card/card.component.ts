import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Items} from '@interfaces/items.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent{
  @Input() searchResult: Items[] = [];
}
