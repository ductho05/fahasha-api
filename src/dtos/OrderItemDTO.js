const OrderDTO = require("../dtos/OrderDTO")
const ProductDTO = require("../dtos/ProductDTO")

class OrderItemDTO {

    constructor(_id, quantity, price, status, order, product) {

        this._id = _id
        this.quantity = quantity
        this.price = price
        this.status = status
        this.order = order
        this.product = product

    }

    mapToOrderItemDTO(orderItem) {
        var {

            _id,
            quantity,
            price,
            status,
            order,
            product

        } = orderItem

        if (order && typeof order != 'string') {

            const orderDTO = OrderDTO.mapToOrderDTO(order)
            order = { ...orderDTO }
        }

        if (product && typeof product != 'string') {

            const productDTO = ProductDTO.mapToProductDTO(product)
            product = { ...productDTO }
        }

        return new OrderItemDTO(_id, quantity, price, status, order, product)
    }

}

module.exports = new OrderItemDTO
