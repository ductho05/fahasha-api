const ServiceResponse = require("../response/ServiceResponse")
const Status = require("../utils/Status")
const Messages = require("../utils/Messages")
const FlashSale = require("../models/FlashSale")

class FlashSaleService {

    async getById(id) {

        try {

            const data = await FlashSale.findById(id)
                .populate({
                    path: 'product',
                    populate: {
                        path: 'categoryId',
                        model: 'Category'
                    }
                })
                .exec();

            return new ServiceResponse(
                200,
                Status.SUCCESS,
                Messages.GET_FLASHSALE_SUCCESS,
                data
            )

        } catch (err) {

            return new ServiceResponse(
                500,
                Status.ERROR,
                Messages.INTERNAL_SERVER
            )
        }
    }

    async getProduct(categoryId, start, end, sort, filter, productId, date, point, enddate) {

        try {

            const currentDate = new Date();
            // Chuyển múi giờ sang UTC+7 (Giờ Đông Dương)
            const utcOffset = 7 * 60; // 7 giờ * 60 phút/giờ
            currentDate.setMinutes(currentDate.getMinutes() + utcOffset);


            let current_point_sale = Math.floor(new Date().getHours() / 3);
            let toDay = currentDate.toISOString().slice(0, 10);

            const flashSales = await FlashSale

                // tìm theo  id

                .find(productId ? { product: productId } : {})
                // tìm theo ngày và khung giờ

                .find(!date ? {} : enddate ? {
                    $and: [
                        { date_sale: { $gte: date } },
                        { date_sale: { $lte: enddate } },
                    ],
                } : {
                    date_sale: date,
                })
                .find(point ? {
                    point_sale: point
                } : {})

                .find(filter == "expired" ? {
                    $and: [
                        { date_sale: toDay },
                        { point_sale: current_point_sale },
                    ],
                } : {})
                .find(filter == "no-expired" ? {
                    $or: [
                        {
                            $and: [
                                { date_sale: toDay },
                                { point_sale: { $gt: current_point_sale } },
                            ],
                        },
                        {
                            date_sale: { $gt: toDay },
                        }
                    ]
                } : {})
                .populate({
                    path: 'product',
                    populate: {
                        path: 'categoryId',
                        model: 'Category' // Tên của mô hình Category
                    }
                })
                .skip(start)
                .limit(end)
                .exec();

            // Lặp qua danh sách flashSales để lấy thông tin category từ biến product.category
            const flashSalesWithCategory = flashSales.filter((flashSale) => {
                return categoryId ? flashSale.product.categoryId._id == categoryId : true
            });

            if (sort) {
                if (sort == "reverse") flashSalesWithCategory.reverse();
                if (filter == "num_sale") {
                    flashSalesWithCategory.sort(function (a, b) {
                        if (sort == "asc") {
                            return a.num_sale - b.num_sale;
                        }
                        if (sort == "desc") {
                            return b.num_sale - a.num_sale;
                        }
                    });
                }
                if (filter == "sold_sale") {
                    flashSalesWithCategory.sort(function (a, b) {
                        if (sort == "asc") {
                            return a.sold_sale - b.sold_sale;
                        }
                        if (sort == "desc") {
                            return b.sold_sale - a.sold_sale;
                        }
                    });
                }
                if (filter == "current_sale") {
                    flashSalesWithCategory.sort(function (a, b) {
                        if (sort == "asc") {
                            return a.current_sale - b.current_sale;
                        }
                        if (sort == "desc") {
                            return b.current_sale - a.current_sale;
                        }
                    });
                }
                if (filter == "date_sale") {
                    flashSalesWithCategory.sort(function (a, b) {
                        let dateA = new Date(a.date_sale);
                        let dateB = new Date(b.date_sale);
                        if (sort == "asc") {
                            return dateA - dateB;
                        }
                        if (sort == "desc") {
                            return dateB - dateA;
                        }
                    });
                }
                if (filter == "point_sale") {
                    flashSalesWithCategory.sort(function (a, b) {
                        if (sort == "asc") {
                            return a.point_sale - b.point_sale;
                        }
                        if (sort == "desc") {
                            return b.point_sale - a.point_sale;
                        }
                    });
                }
                if (filter == "time_sale") {
                    flashSalesWithCategory.sort(function (a, b) {
                        if (sort == "asc") {
                            return a.time_sale - b.time_sale;
                        }
                        if (sort == "desc") {
                            return b.time_sale - a.time_sale;
                        }
                    });
                }
            }

            return new ServiceResponse(
                200,
                Status.SUCCESS,
                Messages.GET_DATA_SUCCESS,
                flashSalesWithCategory
            )

        } catch (err) {

            return new ServiceResponse(
                500,
                Status.ERROR,
                Messages.INTERNAL_SERVER
            )
        }
    }

    async addProduct(currentHour, inputTime, toDay, inputDay, body) {

        try {

            if (inputDay < toDay || (inputDay == toDay && (inputTime + 1) * 3 <= currentHour)) {

                return new ServiceResponse(
                    400,
                    Status.ERROR,
                    Messages.TIME_IN_PAST
                )
            }

            const existingRecord = await FlashSale.findOne({
                date_sale: body.date_sale,
                point_sale: body.point_sale,
                product: body.product,
                current_sale: body.current_sale,
            });

            if (existingRecord) {

                existingRecord.num_sale += body.num_sale
                await existingRecord.save()

                return new ServiceResponse(
                    200,
                    Status.SUCCESS,
                    Messages.UPDATE_DATA_SUCCESS,
                    existingRecord
                )

            } else {

                const data = await FlashSale.create(body);
                if (data) {

                    return new ServiceResponse(
                        200,
                        Status.SUCCESS,
                        Messages.INSERT_DATA_SUCCESS,
                        data
                    )

                } else {

                    return new ServiceResponse(
                        400,
                        Status.ERROR,
                        Messages.INSERT_DATA_ERROR
                    )
                }
            }

        } catch (err) {

            return new ServiceResponse(
                500,
                Status.ERROR,
                Messages.INTERNAL_SERVER
            )
        }
    }

    async update(id, updateProduct) {

        try {

            const result = await FlashSale.findByIdAndUpdate({ _id: id }, updateProduct).exec()
            if (result) {

                return new ServiceResponse(
                    200,
                    Status.SUCCESS,
                    Messages.UPDATE_DATA_SUCCESS,
                    updateProduct
                )
            } else {

                return new ServiceResponse(
                    400,
                    Status.ERROR,
                    Messages.UPDATE_DATA_ERROR
                )
            }

        } catch (err) {

            return new ServiceResponse(
                500,
                Status.ERROR,
                Messages.INTERNAL_SERVER
            )
        }
    }

    async deleteExpired() {

        try {

            const currentDate = new Date();
            //const inputDate = new Date(req.body.date_sale);

            const currentHour = currentDate.getHours();
            // const inputTime = req.body.point_sale;

            let toDay = currentDate.toISOString().slice(0, 10);
            //let inputDay = inputDate.toISOString().slice(0, 10);
            // Tìm tất cả các Flash Sale đã hết hạn
            const expiredSales = await FlashSale.find({ date_sale: { $lte: toDay } });
            // Xóa các Flash Sale đã hết hạn
            for (const sale of expiredSales) {
                await FlashSale.deleteOne({ _id: sale._id });
            }

            return new ServiceResponse(
                200,
                Status.SUCCESS,
                Messages.DELETE_DATA_SUCCESS
            )

        } catch (err) {

            return new ServiceResponse(
                500,
                Status.ERROR,
                Messages.INTERNAL_SERVER
            )
        }
    }

    async delete(id) {

        try {

            const data = await FlashSale.deleteOne({ _id: id });

            if (data) {

                return new ServiceResponse(
                    200,
                    Status.SUCCESS,
                    Messages.DELETE_DATA_SUCCESS,
                    data
                )
            } else {

                return new ServiceResponse(
                    400,
                    Status.ERROR,
                    Messages.DELETE_DATA_ERROR
                )
            }

        } catch (err) {

            return new ServiceResponse(
                500,
                Status.ERROR,
                Messages.INTERNAL_SERVER
            )
        }
    }
}

module.exports = new FlashSaleService
