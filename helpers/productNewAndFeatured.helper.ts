import ProductAssets from "../models/productAssets.model";
import Assets from "../models/assets.model";
import ProductItem from "../models/product-items.model";
export const productNewAnhFeature = async (array: any) => {
  for await (const it of array) {
    it["img_main"] = [];
    const img = await ProductAssets.find({
      productId: it.id,
      type: "main",
    });
    if (img.length > 0) {
      for await (const image of img) {
        const assets__main = await Assets.findOne({
          _id: image.assetsId,
        });
        it["img_main"].push(assets__main.path);
      }
    }

    const listItem = await ProductItem.find({
      productId: it.id,
    });
    if (listItem.length > 0) {
      if (listItem.length > 1) {
        const minItem = listItem.reduce((min, item) => {
          return Math.ceil(item.price * item.discount) <
            Math.ceil(min.price * min.discount)
            ? item
            : min;
        }, listItem[0]);
        it["priceNew"] = Math.ceil(
          minItem.price - minItem.price * (minItem.discount / 100)
        );
        it.price = minItem.price;
        it.discount = minItem.discount;
      } else {
        it["priceNew"] = Math.ceil(
          listItem[0].price - listItem[0].price * (listItem[0].discount / 100)
        );
        it.price = listItem[0].price;
        it.discount = listItem[0].discount;
      }
    } else {
    }
  }
};
