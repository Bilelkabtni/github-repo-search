import {Items} from '@interfaces/items.interface';


export  interface GithubRepoData {
  total_count?: number;
  incomplete_results?: number;
  items?: Items[];
}
