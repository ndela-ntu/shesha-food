import { IStore } from "@/models/store";

type MenuWithRegion = {
  id: number;
  storeId: number;
  avgRating: number;
};

export function menuWithRatings(stores: IStore[]): MenuWithRegion[] {
  return stores.flatMap((store) =>
    store.menu.map((item) => {
      const avgRating = item.ratings
        ? item.ratings?.reduce((sum, r) => sum + r.rating, 0) /
          item.ratings?.length
        : 0;

      return {
        id: item.id,
        storeId: store.id,
        avgRating,
      };
    })
  );
}
