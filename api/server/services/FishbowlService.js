import { fbdb } from "../src/models";

const Op = fbdb.Sequelize.Op;

class FishbowlService {
  /*
newOrders

- Action: Opening Recent Orders component.

- API will:
    - Query fishbowl database for new POs that are issued but not completed.
    - Query machinist database for each PO to see if they exist in the system already.
    - If not, enter new PO into machinist database with a "pending" status.
    - Respond with list of POs with pending status.
 "id", "buyer", "dateIssued", "note", "num"
 */
  static async getAllOpenOrders() {
    try {
      return await fbdb.po.findAll({
        attributes: [
          "id",
          "num",
          "buyer",
          "note",
          "dateIssued",
          "dateFirstShip"
        ],
        where: {
          dateIssued: {
            [Op.ne]: null
          },
          dateCompleted: null,
          vendorId: 109
        }
      });
    } catch (error) {
      throw error;
    }
  }

  static async getOrder(id) {
    try {
      console.log("in Fishbowl Service..");
      return await fbdb.po.findOne({
        attributes: [
          "id",
          "num",
          "buyer",
          "note",
          "dateIssued",
          "dateFirstShip"
        ],
        where: {
          dateIssued: {
            [Op.ne]: null
          },
          dateCompleted: null,
          vendorId: 109,
          id: id
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getOrderItems(id) {
    try {
      return await fbdb.poitem.findAll({
        attributes: ["partNum", "description", "revLevel", "qtyToFulfill"],
        where: {
          poId: id
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default FishbowlService;
