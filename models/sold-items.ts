import { ITEMSCATEGORY } from "./items-category";

export default interface ISoldItems {
  name: string;
  category: ITEMSCATEGORY;
  price: number;
  description: string;
  imageUrl: string;
  ingredients: string[];
}

