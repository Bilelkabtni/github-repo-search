import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Favorite} from '@customTypes/favorite.type';
import {Items} from '@interfaces/items.interface';
import {GithubService} from '@services/github.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent {
  @Input() repo: Items;
  favorite: Items[] = this.getCachedFavorites;

  get getCachedFavorites(): Items[] {
    return this.githubService.getCachedFavorites;
  }

  get isCached(): boolean {
    return this.favorite.some((item) => {
      return item.id === this.repo.id;
    });
  }

  constructor(private githubService: GithubService) {
  }

  addToFavorite(): void {
    if (!this.isCached) {
      this.favorite = [...this.getCachedFavorites, this.repo];
      localStorage.setItem('favRepo', JSON.stringify(this.favorite));
    } else {
      this.favorite = this.getCachedFavorites.filter(item => item.id !== this.repo.id);
      localStorage.setItem('favRepo', JSON.stringify(this.favorite));
    }
  }

  getFavoriteIcon(): Favorite {
    return this.favorite.some(item => item.id === this.repo.id) ? 'favorite' : 'favorite_border';
  }
}
