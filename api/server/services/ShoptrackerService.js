import { shopdb } from "../src/models";
import FishbowlService from "./FishbowlService";

const Op = shopdb.Sequelize.Op;

class ShoptrackerService {
  /*
addNewOrder

- Action: Clicking "+" button next to PO on Orders Component.

- API will:
    - Update the status of that PO in the machinist database
    - Query the fishbowl database for PO Items and part information
    - Insert the PO Items into the machinist database
    - Query the machinist database for the each part to see if it exists in the system.
    - Insert new parts into the machinist database

 */

  static async addNewOrder(id) {
    try {
      console.log("in Service...");
      const orderData = await FishbowlService.getOrder(id);
      console.log("received order data..");
      const orderItemData = await FishbowlService.getOrderItems(id);
      console.log("received order item data..");
      const lastPO = await this.getLastPO();
      console.log("received lastPO..");
      const partIds = await this.findAndAddNewParts(orderItemData);
      console.log("added parts..");
      const order = this.prepOrderData(orderData, orderItemData, lastPO);
      const orderItems = this.prepOrderItemData(orderItemData, order, partIds);
      console.log("prepped order data...");
      const addedOrder = await this.addOrder(order, orderItems);
      console.log(addedOrder);
      return addedOrder.dataValues;
    } catch (error) {
      throw error;
    }
  }

  static async getLastPO() {
    const lastOrder = await shopdb.lastpo.findOne({
      attribute: ["lastPO"],
      where: { id: 1 }
    });
    return lastOrder.lastPO;
  }

  static async findAndAddNewParts(orderItemsData) {
    let partIds = [];
    const t = await shopdb.sequelize.transaction();

    try {
      for (const item of orderItemsData) {
        const [part, created] = await shopdb.part.findOrCreate({
          where: {
            num: item.partNum,
            rev: item.revLevel
          },
          defaults: {
            num: item.partNum,
            rev: item.revLevel,
            desc: item.description
          },
          transation: t
        });
        partIds.push(part.id);
      }

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }

    return partIds;
  }

  static prepOrderData(orderData, orderItemData, lastPO) {
    let partQty = 0;
    console.log("prepping order data");
    orderItemData.map(item => {
      partQty += parseInt(item.qtyToFulfill);
    });
    console.log("last PO is " + lastPO);
    return {
      poId: orderData.id,
      num: orderData.num,
      buyer: orderData.buyer,
      note: orderData.note,
      dateIssued: orderData.dateIssued,
      dateLastModified: new Date().toLocaleString(),
      status: "PENDING",
      dateRequested: orderData.dateFirstShip,
      priority: 2,
      partQty: partQty,
      nextPO: lastPO
    };
  }

  static prepOrderItemData(orderItemData, order, partIds) {
    let orderItems = [];
    console.log(orderItemData.length);
    for (let i = 0; i < orderItemData.length; i++) {
      orderItems.push({
        poId: order.poId,
        partId: partIds[i],
        qty: orderItemData[i].qtyToFulfill,
        lastUpdate: new Date().toLocaleString()
      });
    }

    return orderItems;
  }

  static async addOrder(order, orderItems) {
    console.log("adding order num:" + order.num);


    try {
      console.log(order);
      const [addedOrder, created] = await shopdb.po.findOrCreate({
        where: {
          poId: order.poId
        },
        defaults: {
          num: order.num,
          buyer: order.buyer,
          note: order.note,
          dateIssued: order.dateIssued,
          dateLastModified: order.dateLastModified,
          status: order.status,
          dateRequested: order.dateRequested,
          priority: order.priority,
          partQty: order.partQty,
          nextPo: order.nextPO
        }
      });
      console.log("Created is " + created);

      if (created) {
        shopdb.poitems.bulkCreate(
          orderItems
        );

        shopdb.lastpo.update(
          { lastPO: order.poId },
          {
            where: { id: 1 }
          }
        );
      }
      return addedOrder;
    } catch (error) {
      throw error;
    }

    return newOrder;
  }

  /*
currentOrders

- Action: Opening Current Orders component.

- API will:
    - Query machinist database for all PO with "open" status along with all their items and part info.
    - return results

 */

  static async getOpenOrders() {
    try {
      return await shopdb.po.findAll({ where: {status: { [Op.ne]: "CLOSED"} } });
    } catch (error) {
      throw error;
    }
  }

  static async ordersWithStatus(status) {
    try {
      return await shopdb.po.findAll({ where: { status: status } });
    } catch (error) {
      throw error;
    }
  }

  static async getOrderParts(id) {
    let orderItems = await this.getOrderItems(id);
    let orderParts = [];

    try {
      for (const item of orderItems) {
        const part = await shopdb.part.findOne({
          where: { id: item.partId }
        });
        orderParts.push(Object.assign(part.dataValues, item))
      }
    } catch (error) {
      throw error;
    }
    console.log(orderParts);
    return orderParts;
  }

  static async getOrderItems(id) {
    try {
      const orderItemData = await shopdb.poitems.findAll({ where: { poId: id } });
      const orderItems = orderItemData.map(orderItem => orderItem.dataValues);

      return orderItems;
    } catch (error) {
      throw error;
    }
  }

  /*
reorderList

- Action: Saving reordered list of POs

- API will:
    - Update the nextId column for the POs listed in the request.

 */
  static updateListOrder(updatedList) {
    try {
      shopdb.transaction(t => {
        updatedList.map(async order => {
          await shopdb.po.findOrCreate({
            where: {
              poId: order.poId,
              nextPO: order.nextPO
            },
            transation: t
          });
        });
      });
    } catch (error) {
      throw error;
    }
  }

  static reorderList(previousOrder, movedOrder, nextOrder) {
    try {
      shopdb.transaction(t => {
        shopdb.po.update(
          { nextPO: movedOrder },
          { where: { poId: previousOrder }, transaction: t }
        );
        shopdb.po.update(
          { nextPO: nextOrder },
          { where: { poId: movedOrder }, transaction: t }
        );
      });
    } catch (error) {
      throw error;
    }
  }

  static async getNextOrder(poId) {
    try {
      const order = await shopdb.po.findOne({
        attributes: nextPO,
        where: { poId: poId }
      });
      return order.nextPO;
    } catch (error) {
      throw error;
    }
  }
  /*
finishItem

- Action: Clicking "√" next to a PO Item

- API will:
    - Update status of PO Item to "completed"
    - Query status of all PO Items with same PO id.
    - if all items completed, change status of PO to "complete" return id and nextId
    - query PO with nextId matching the id of newly completed PO and update it

 */

  static async finishItem(itemId) {
    try {
      const date = new Date().toLocaleString();
      const item = await shopdb.poitem.update(
        { dateComplete: date },
        { where: { id: itemId } }
      );
      const orderComplete = await this.checkOrderComplete(item.poId);
      if (orderComplete) {
        await shopdb.po.update(
          {
            dateComplete: date,
            dateLastModified: date,
            status: "COMPLETE"
          },
          { where: { poId: item.poId } }
        );
      }
    } catch (error) {
      throw error;
    }
  }
  //undoCompleteItem, checks if order was complete and undos finishItem

  static async checkOrderComplete(poId) {
    try {
      const incompleteOrderItems = await shopdb.poitem.findAll({
        where: { poId: poId, dateComplete: null }
      });

      if (incompleteOrderItems.length > 0) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }

  /*
updateItem

- Action: Clicking "Save" button next to a PO item

- API will:
    - Update status of PO item to reflect all the changed values

 */
  static async updateItem(item) {
    try {
      await shopdb.poitem.update(item, { where: { id: item.id } });
    } catch (error) {
      throw error;
    }
  }

  /*
updateParts

- Action: Clicking "Save" button next to a part.

- API will:
    - Update status of part to reflect all the changed values
 */

  static async updateParts(part) {
    try {
      await shopdb.part.update(part, { where: { id: part.id } });
    } catch (error) {
      throw error;
    }
  }

  static async updateOrder(order) {
    try {
      await shopdb.po.update(order, { where: { poId: order.id } });
    } catch (error) {
      throw error;
    }
  }
}

export default ShoptrackerService;
