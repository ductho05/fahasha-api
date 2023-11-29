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

        if (Object.keys(order).length > 0) {

            const orderDTO = OrderDTO.mapToOrderDTO(order)
            order = { ...orderDTO }
        }

        if (Object.keys(product).length > 0) {

            const productDTO = ProductDTO.mapToProductDTO(product)
            product = { ...productDTO }
        }

        return new OrderItemDTO(_id, quantity, price, status, order, product)
    }

}

module.exports = new OrderItemDTO
