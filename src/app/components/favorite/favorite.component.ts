import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Favorite} from '@newTypes/favorite.type';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit {
  @Input() repoId: number;
  favorite: number[] = [];

  // return stored favorites and convert them to integer
  get favoriteFromStorage(): number[] {
    return localStorage.getItem('favRepo')?.split(',')
      .map(id => +id) || [];
  }

  addToFavorite(): void {
    if (!this.favorite.includes(this.repoId)) {
      this.favorite = [...this.favoriteFromStorage, this.repoId];
      localStorage.setItem('favRepo', this.favorite.toString());
    } else {
      this.favorite = this.favoriteFromStorage.filter(item => item !== this.repoId);
      localStorage.setItem('favRepo', this.favorite.toString());
    }
  }

  getFavoriteIcon(): Favorite {
    return this.favorite.includes(this.repoId) ? 'favorite' : 'favorite_border';
  }

  ngOnInit(): void {
    this.favorite = this.favoriteFromStorage;
  }

}
