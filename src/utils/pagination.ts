export const getOffset = (page: number, perPage: number) => (page - 1) * perPage;

export const getPage = (offset: number, perPage: number) => Math.ceil(offset / perPage);

export const getTotalPages = (totalHitCount: number, perPage: number) =>
  Math.ceil(totalHitCount / perPage);
