export interface Venta {
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  preparationMinutes: number;
  cookingMinutes: number;
  healthScore: number;
  pricePerServing: number;
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
}
