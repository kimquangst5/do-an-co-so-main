import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {
    accountsService,
    rolesService,
} from "../../services/admin/index.service";
import Role from "../../models/roles.models";
import Account from "../../models/accounts.model";
import { capitalizeWords } from "../../helpers/capitalizeWords.helper";
import Review from "../../models/reviews.model";
import Product from "../../models/products.model";
import Customer from "../../models/customers.model";

const index = async (req: Request, res: Response) => {
    const reviews = await Review.find({})
    // console.log(reviews);
    for (const it of reviews) {
        const product = await Product.findOne({
            _id: it.product_id
        }).select('name')
        console.log(product);

        const customer = await Customer.findOne({
            _id: it.customer_id
        }).select('fullname')

        it['product_name'] = product.name
        it['customer_name'] = customer.fullname
    }

    res.render("admin/pages/reviews/index.pug", {
        pageTitle: "Danh sách đánh giá / bình luận",
        pageDesc: "Danh sách đánh giá / bình luận",
        reviews
    });
};

const changeStatus = async (req: Request, res: Response) => {
    console.log(req.params);
    const { id } = req.params
    console.log(id);
    let review = await Review.findOne({
        _id: id
    })
    await Review.updateOne({
        _id: id
    }, { is_approved: !review.is_approved })

    res.json({
        code: 200
    })
}


export { index, changeStatus };
