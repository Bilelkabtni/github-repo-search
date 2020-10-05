import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit {
  @Input() repoId: number;
  favorite: number[] = [];

  addToFavorite(): void {
    if (!this.favorite.includes(this.repoId)) {
      this.favorite = [...this.loadFavoriteFromStorage(), this.repoId];
      localStorage.setItem('favRepo', this.favorite.toString());
    } else {
      this.favorite = this.loadFavoriteFromStorage()
        .filter(item => item !== this.repoId);
    }
  }

  loadFavoriteFromStorage(): number[] {
    return localStorage.getItem('favRepo')?.split(',')
      .map(id => +id) || [];
  }

  getFavoriteIcon(): string {
    return this.favorite.includes(this.repoId) ? 'favorite' : 'favorite_border';
  }

  ngOnInit(): void {
    this.favorite = this.loadFavoriteFromStorage();
  }

}
