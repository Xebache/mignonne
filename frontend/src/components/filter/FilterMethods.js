const applyFilterCategory = (products, filter) => {
  let selectedCategories = products;
  if (filter.length > 0)
    selectedCategories = products.filter((product) =>
      filter.map((c) => c.name).includes(product.category.name)
    );
  return selectedCategories;
};

const applyFilterCollection = (products, filter) => {
  let selectedCollections = products;
  if (filter.length > 0)
    selectedCollections = products.filter((product) =>
      filter.map((c) => c.name).includes(product.collection.name)
    );
  return selectedCollections;
};

const applyFilterPrice = (products, filter) => {
  return products.filter(
    (product) =>
      parseInt(product.price) >= filter.min &&
      parseInt(product.price) <= filter.max
  );
};

const applyFilters = (products, filter) => {
  let selectedCategories = applyFilterCategory(products, filter.categories);
  let selectedCollections = applyFilterCollection(products, filter.collections);
  let selectedPriceRange = applyFilterPrice(products, filter.range);

  return selectedCategories
    .filter((product) => selectedCollections.includes(product))
    .filter((product) => selectedPriceRange.includes(product));
};

export default applyFilters;
