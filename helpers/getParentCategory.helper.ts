import ProductCategory from "../models/productsCategories.model";

const xuli = async (category: any) => {
  let arrayCategory = [];
  const getParentCategory = async (categories: any) => {
    const category = await ProductCategory.findOne({
      _id: categories,
      status: "active",
      deleted: false,
    });
    arrayCategory.push(category);
    if (category.parentId) {
      await getParentCategory(category.parentId);
    }
  };
  await getParentCategory(category);

  return arrayCategory;
};

const getParentCategory = async (categories: any) => {
  const result = await xuli(categories);
  return result;
};
export default getParentCategory;
