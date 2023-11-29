
class ProductDTO {

    constructor(_id, title, author, published_date, price, old_price, rate, sold,
        desciption, status, images, list_Images, categoryId, quantity) {

        this._id = _id
        this.title = title
        this.author = author
        this.published_date = published_date
        this.price = price
        this.old_price = old_price
        this.rate = rate
        this.sold = sold
        this.desciption = desciption
        this.status = status
        this.images = images
        this.list_Images = list_Images
        this.categoryId = categoryId
        this.quantity = quantity
    }

    mapToProductDTO(product) {
        var {
            _id,
            title,
            author,
            published_date,
            price,
            old_price,
            rate,
            sold,
            desciption,
            status,
            images,
            list_Images,
            categoryId,
            quantity
        } = product

        if (Object.keys(categoryId).length > 0) {
            categoryId = {
                _id: categoryId._id,
                name: categoryId.name
            }
        }

        return new ProductDTO(_id, title, author, published_date, price, old_price, rate, sold,
            desciption, status, images, list_Images, categoryId, quantity)
    }

}

module.exports = new ProductDTO
