import {Owner} from '@interfaces/owner.interface';

export interface Items  {
  id: number;
  node_id: string;
  full_name: string;
  name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  default_branch: string;
  description: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers: number;
  score: number;
}
