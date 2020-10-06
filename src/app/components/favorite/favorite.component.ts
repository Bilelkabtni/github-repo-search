import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Favorite} from '@newTypes/favorite.type';
import {GithubSearch} from '@models/githubSearch.model';
import {Items} from '@interfaces/items.interface';
import {GithubService} from '@services/github.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit {
  @Input() repo: Items;
  favorite: Items[] = [];

  constructor(private githubService: GithubService) {
  }

  addToFavorite(): void {
    if (!this.favorite.includes(this.repo)) {
      this.favorite = [...this.githubService.favoriteFromStorage, this.repo];
      localStorage.setItem('favRepo', JSON.stringify(this.favorite));
    } else {
      this.favorite = this.favorite.filter(item => item !== this.repo);
    }
  }

  getFavoriteIcon(): Favorite {
    return this.favorite.some(item => item.id === this.repo.id) ? 'favorite' : 'favorite_border';
  }

  ngOnInit(): void {
    this.favorite = this.githubService.favoriteFromStorage;
  }

}
