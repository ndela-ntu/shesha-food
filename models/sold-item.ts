import { ITEMSCATEGORY } from "./items-category";
import IRating from "./rating";


export default interface ISoldItem {
  id: number;
  name: string;
  category: ITEMSCATEGORY;
  price: number;
  description: string;
  imageUrl: string;
  ingredients: string[];
  ratings?: IRating[];
}

