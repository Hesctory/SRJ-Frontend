export interface Lunch {
  id: number;
  lunchCategoryId: number;
  lunchCategoryName: string | null;
  lunchName: string | null;
  costPrice: number | null;
  salePrice: number | null;
  comment: string | null;
}

export interface CreateLunchPayload {
  lunchCategoryId: number;
  lunchName?: string | null;
  costPrice?: number | null;
  salePrice?: number | null;
  comment?: string | null;
}
