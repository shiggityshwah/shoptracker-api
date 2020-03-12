import ShoptrackerService from "../services/ShoptrackerService";
import Util from "../utils/Utils";

const util = new Util();

class ShoptrackerController {
  /**
   * * Fishbowl Interaction Controllers *
   */
  static async addFishbowlOrder(req, res) {
    const { id } = req.params;
    console.log("in Add New Order Controller...");
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const newOrder = await ShoptrackerService.addFishbowlOrder(id);

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

  /**
   * * Order Controllers *
   */
  static async createOrder(req, res) {
    if (!req.body.order || !req.body.orderitems) {
      util.setError(
        400,
        "Order creation requires both an 'order' object and 'orderitems' array."
      );
      return util.send(res);
    }

    const order = req.body.order;
    const orderItems = req.body.orderitems;
    try {
      const updatedOrderItem = await ShoptrackerService.prepAndCreateOrder(
        order,
        orderItems
      );
      if (!updatedOrderItem) {
        util.setError(
          404,
          `Cannot find orderitem with the id: ${orderitem.id}`
        );
      } else {
        util.setSuccess(200, "Orderitem updated.", updatedOrderItem);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getOrder(req, res) {
    const { id } = req.params;

    switch (id) {
      case "allopen":
        try {
          const allOpenOrders = await ShoptrackerService.getAllOpenOrders();
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
        break;
      case "closed":
        try {
          const closedOrders = await ShoptrackerService.getOrdersWithStatus(
            closed
          );
          if (closedOrders.length > 0) {
            util.setSuccess(200, "Orders retrieved", allOpenOrders);
          } else {
            util.setSuccess(200, "No open orders found");
          }
          return util.send(res);
        } catch (error) {
          util.setError(400, error);
          return util.send(res);
        }
        break;
      case !Number(id):
        util.setError(404, "not implemented yet");
        return util.send(res);
        break;
      default:
        util.setError(404, "not implemented yet");
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

  static async deleteOrder(req, res) {}

  static async getOrderItems(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const orderItems = await ShoptrackerService.getOrderItems(id);

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

  static async getOrderParts(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const orderItems = await ShoptrackerService.getParts(id);

      if (!orderItems) {
        util.setError(404, `Unable to find PO with id ${id}`);
      } else {
        util.setSuccess(
          200,
          "Found " + orderItems.length + " parts on PO id " + id,
          orderItems
        );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  /**
   * * Order Item Controllers *
   */
  static async createOrderItem(req, res) {}
  static async getOrderItem(req, res) {}
  static async updateOrderItem(req, res) {
    if (!req.body.id) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }

    const orderitem = req.body;
    try {
      const updatedOrderItem = await ShoptrackerService.updateOrderItem(
        orderitem
      );
      if (!updatedOrderItem) {
        util.setError(
          404,
          `Cannot find orderitem with the id: ${orderitem.id}`
        );
      } else {
        util.setSuccess(200, "Orderitem updated.", updatedOrderItem);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
  static async deleteOrderItem(req, res) {}

  /**
   * * Part Controllers *
   */
  static async getPartList(req, res) {
    try {
      const partList = await ShoptrackerService.getPartList();
      if (partList.length > 0) {
        util.setSuccess(200, "list of all parts retrieved", partList);
      } else {
        util.setSuccess(200, "no parts found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
  static async createPart(req, res) {}
  static async getPart(req, res) {
    const { id } = req.params;
    let partData;

    if (id == "all") {
      try {
        partData = await ShoptrackerService.getAllParts();
      } catch (error) {
        util.setError(404, error);
        return util.send(res);
      }
    } else if (!Number(id)) {
      util.setError(400, "please input a valid numeric value");
    } else {
      try {
        partData = await ShoptrackerService.getPart(id);
      } catch (error) {
        util.setError(404, error);
        return util.send(res);
      }
    }

    if (!partData) {
      util.setError(404, `Unable to find part with the id ${id}`);
    } else {
      util.setSuccess(200, "fetched part data", partData);
    }
    return util.send(res);
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
  static async deletePart(req, res) {}

  /**
   * * Queue Controllers *
   */
  static async updateQueue(req, res) {
    if (
      !req.body.previousOrder ||
      !req.body.movedOrder ||
      !req.body.nextOrder
    ) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }

    const previousOrder = req.body.previousOrder;
    const movedOrder = req.body.movedOrder;
    const nextOrder = req.body.nextOrder;

    try {
      const updatedOrder = await ShoptrackerService.updateQueue(
        previousOrder,
        movedOrder,
        nextOrder
      );
      if (!updatedOrderItem) {
        util.setError(
          404,
          `Cannot find orderitem with the id: ${orderitem.id}`
        );
      } else {
        util.setSuccess(200, "Orderitem updated.", updatedOrderItem);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
}

export default ShoptrackerController;
