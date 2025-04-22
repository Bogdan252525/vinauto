import { fetchFilters } from "./fetch-filters";

export const loadFilters = async (subCategoryId: string) => {
  try {
    await fetchFilters(subCategoryId);
    console.log(`Filters loaded for subcategory ID: ${subCategoryId}`);
  } catch (error) {
    console.error(`Failed to fetch filters for subcategory ID ${subCategoryId}`, error);
  }
};
