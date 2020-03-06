import ShoptrackerService from "../services/ShoptrackerService";
import Util from "../utils/Utils";

const util = new Util();

class ShoptrackerController {
  static async getOpenOrders(req, res) {
    try {
      const allOpenOrders = await ShoptrackerService.getOpenOrders();
      if (allOpenOrders.length > 0) {
        util.setSuccess(200, "Orders retrieved", allOpenOrders);
      } else {
        util.setSuccess(200, "No open orders found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getOrderItems(req, res) {
    const { id } = req.params;
    console.log("in Controller...");
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const orderItems = await ShoptrackerService.getOrderParts(id);

      if (!orderItems) {
        util.setError(404, `Unable to find PO with id ${id}`);
      } else {
        util.setSuccess(
          200,
          "Found " + orderItems.length + " items on PO id " + id,
          orderItems
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async addNewOrder(req, res) {
    const { id } = req.params;
    console.log("in Controller...");
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const newOrder = await ShoptrackerService.addNewOrder(id);

      if (!newOrder) {
        util.setError(404, `Unable to add PO with the id ${id}`);
      } else {
        util.setSuccess(200, "Added new order #" + newOrder.num, newOrder);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getPart(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "please input a valid numeric value");
      return util.send(res);
    }

    try {
      const part = await ShoptrackerService.getPart(id);

      if (!part) {
        util.setError(404, `Unable to find part with the id ${id}`);
      } else {
        util.setSuccess(200, "fetched part #" + part.num, part);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async updatePart(req, res) {
    if (!req.body.id) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }

    const part = req.body;
    try {
      const updatedPart = await ShoptrackerService.updatePart(part);
      if (!updatedPart) {
        util.setError(404, `Cannot find part with the id: ${part.id}`);
      } else {
        util.setSuccess(200, "Part updated.", updatedPart);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async updateOrder(req, res) {
    if (!req.body.id) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }

    const order = req.body;
    try {
      const updatedOrder = await ShoptrackerService.updateOrder(order);
      if (!updatedOrder) {
        util.setError(404, `Cannot find order with the id: ${order.id}`);
      } else {
        util.setSuccess(200, "Order updated.", updatedOrder);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async updateOrderItem(req, res) {
    if (!req.body.id) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }

    const orderitem = req.body;
    try {
      const updatedOrderItem = await ShoptrackerService.updateOrderItem(orderitem);
      if (!updatedOrderItem) {
        util.setError(404, `Cannot find orderitem with the id: ${orderitem.id}`);
      } else {
        util.setSuccess(200, "Orderitem updated.", updatedOrderItem);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
  //   static async addBook(req, res) {
  //     if (!req.body.title || !req.body.price || !req.body.description) {
  //       util.setError(400, 'Please provide complete details');
  //       return util.send(res);
  //     }
  //     const newBook = req.body;
  //     try {
  //       const createdBook = await BookService.addBook(newBook);
  //       util.setSuccess(201, 'Book Added!', createdBook);
  //       return util.send(res);
  //     } catch (error) {
  //       util.setError(400, error.message);
  //       return util.send(res);
  //     }
  //   }

  //   static async updatedBook(req, res) {
  //     const alteredBook = req.body;
  //     const { id } = req.params;
  //     if (!Number(id)) {
  //       util.setError(400, 'Please input a valid numeric value');
  //       return util.send(res);
  //     }
  //     try {
  //       const updateBook = await BookService.updateBook(id, alteredBook);
  //       if (!updateBook) {
  //         util.setError(404, `Cannot find book with the id: ${id}`);
  //       } else {
  //         util.setSuccess(200, 'Book updated', updateBook);
  //       }
  //       return util.send(res);
  //     } catch (error) {
  //       util.setError(404, error);
  //       return util.send(res);
  //     }
  //   }
  //   static async deleteBook(req, res) {
  //     const { id } = req.params;

  //     if (!Number(id)) {
  //       util.setError(400, 'Please provide a numeric value');
  //       return util.send(res);
  //     }

  //     try {
  //       const bookToDelete = await BookService.deleteBook(id);

  //       if (bookToDelete) {
  //         util.setSuccess(200, 'Book deleted');
  //       } else {
  //         util.setError(404, `Book with the id ${id} cannot be found`);
  //       }
  //       return util.send(res);
  //     } catch (error) {
  //       util.setError(400, error);
  //       return util.send(res);
  //     }
  //   }
}

export default ShoptrackerController;
