import FishbowlService from '../services/FishbowlService';
import Util from '../utils/Utils';

const util = new Util();

class FishbowlController {
  static async getAllOpenOrders(req, res) {
    try {
      const allOpenOrders = await FishbowlService.getAllOpenOrders();
      if (allOpenOrders.length > 0) {
        util.setSuccess(200, 'Orders retrieved', allOpenOrders);
      } else {
        util.setSuccess(200, 'No orders found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getOrderItems(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const orderItems = await FishbowlService.getOrderItems(id);

      if (!orderItems) {
        util.setError(404, `Cannot find valid order with the id ${id}`);
      } else {
        util.setSuccess(200, `Found ${orderItems.length} items for order #${id}`, orderItems);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
}

export default FishbowlController;