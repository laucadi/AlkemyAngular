import { Recipe } from './recipes';

export interface SpoonResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}
