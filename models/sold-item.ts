import { ITEMSCATEGORY } from "./items-category";

export default interface ISoldItem {
  id: number;
  name: string;
  category: ITEMSCATEGORY;
  price: number;
  description: string;
  imageUrl: string;
  ingredients: string[];
}

