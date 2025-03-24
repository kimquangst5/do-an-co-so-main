import { Request, Response } from "express";
import Product from "../../models/products.model";
import ProductAssets from "../../models/productAssets.model";
import Assets from "../../models/assets.model";
import ProductItem from "../../models/product-items.model";
import { productNewAnhFeature } from "../../helpers/productNewAndFeatured.helper";

const index = async (req: Request, res: Response) => {
  const products = await Product.find({
    deleted: false,
    status: "active",
  })
    .sort({
      position: -1,
    })
    .limit(10);
  await productNewAnhFeature(products);

  const productsFeatured = await Product.find({
    deleted: false,
    status: "active",
    featured: true,
  })
    .sort({
      position: -1,
    })
    .limit(10);
  await productNewAnhFeature(productsFeatured);

  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ",
    products,
    productsFeatured,
  });
};

export { index };
