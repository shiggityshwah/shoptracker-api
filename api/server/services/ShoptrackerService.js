import { shopdb } from "../src/models";
import FishbowlService from "./FishbowlService";

const Op = shopdb.Sequelize.Op;

class ShoptrackerService {
  /**
   * * Fishbowl Interaction Services *
   */

  static async addFishbowlOrder(id) {
    try {
      console.log("in Service...");
      const fishbowlOrderData = await FishbowlService.getOrder(id);
      console.log("received order data..");
      const fishbowlOrderItemData = await FishbowlService.getOrderItems(id);
      console.log("received order item data..");
      const lastPO = await this.getLastPO();
      console.log("received lastPO..");
      const partIds = await this.findOrCreateNewParts(fishbowlOrderItemData);
      console.log("added parts..");
      const order = this.prepFishbowlOrderData(
        fishbowlOrderData,
        fishbowlOrderItemData,
        lastPO
      );
      const orderItems = this.prepFishbowlOrderItemData(
        fishbowlOrderItemData,
        order,
        partIds
      );
      console.log("prepped order data...");
      const addedOrder = await this.createOrder(order, orderItems);
      console.log(addedOrder);
      return addedOrder.dataValues;
    } catch (error) {
      throw error;
    }
  }

  static prepFishbowlOrderData(
    fishbowlOrderData,
    fishbowlOrderItemData,
    lastPO
  ) {
    let partQty = 0;
    console.log("prepping order data");
    fishbowlOrderItemData.map(item => {
      partQty += parseInt(item.qtyToFulfill);
    });
    console.log("last PO is " + lastPO);
    return {
      poId: fishbowlOrderData.id,
      num: fishbowlOrderData.num,
      buyer: fishbowlOrderData.buyer,
      note: fishbowlOrderData.note,
      dateIssued: fishbowlOrderData.dateIssued,
      dateLastModified: new Date().toLocaleString(),
      status: "PENDING",
      dateRequested: fishbowlOrderData.dateFirstShip,
      priority: 2,
      partQty: partQty,
      nextPO: lastPO
    };
  }

  static prepFishbowlOrderItemData(fishbowlOrderItemData, order, partIds) {
    let orderItems = [];
    console.log(fishbowlOrderItemData.length);
    for (let i = 0; i < fishbowlOrderItemData.length; i++) {
      orderItems.push({
        poId: order.poId,
        partId: partIds[i],
        qty: fishbowlOrderItemData[i].qtyToFulfill,
        lastUpdate: new Date().toLocaleString()
      });
    }

    return orderItems;
  }

  static async findOrCreateNewFishbowlParts(fishbowlOrderItemsData) {
    let partIds = [];
    const t = await shopdb.sequelize.transaction();

    try {
      for (const item of fishbowlOrderItemsData) {
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

  /**
   * * Order Services *
   */

  static async createOrder(order, orderItems) {
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

      if (created && orderItems.length > 0) {
        shopdb.poitems.bulkCreate(orderItems);

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
  }

  static async prepAndCreateOrder(orderData, orderItemData) {
    const lastPO = await this.getLastPO();
    const partIds = await this.findOrCreateNewParts(OrderItemData);
    const order = this.prepOrderData(orderData, orderItemData, lastPO);
    const orderItems = this.prepOrderItemData(orderItemData, order, partIds);
    const addedOrder = await this.createOrder(order, orderItems);
    console.log(addedOrder);
    return addedOrder.dataValues;
  }

  static prepOrderData(OrderData, OrderItemData, lastPO) {
    let partQty = 0;
    console.log("prepping order data");
    OrderItemData.map(item => {
      partQty += parseInt(item.qty);
    });
    console.log("last PO is " + lastPO);
    return {
      poId: OrderData.poId,
      num: OrderData.num,
      buyer: OrderData.buyer,
      note: OrderData.note,
      dateIssued: OrderData.dateIssued,
      dateLastModified: new Date().toLocaleString(),
      status: "PENDING",
      dateRequested: OrderData.dateRequested,
      priority: 2,
      partQty: partQty,
      nextPO: lastPO
    };
  }

  static async getAllOpenOrders() {
    try {
      return await shopdb.po.findAll({
        where: { status: { [Op.ne]: "CLOSED" } }
      });
    } catch (error) {
      throw error;
    }
  }

  static async getOrdersWithStatus(status) {
    try {
      return await shopdb.po.findAll({ where: { status: status } });
    } catch (error) {
      throw error;
    }
  }

  static async getOrder(poId) {
    try {
      return await shopdb.po.findOne({ where: { poId: poId } });
    } catch (error) {
      throw error;
    }
  }

  static async deleteOrder(poId) {
    try {
      await shopdb.po.destroy({ where: { poId: poId } });
      return true;
    } catch (error) {
      return false;
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
        orderParts.push(Object.assign(part.dataValues, item));
      }
    } catch (error) {
      throw error;
    }
    return orderParts;
  }

  static async getOrderItems(id) {
    try {
      const orderItemData = await shopdb.poitems.findAll({
        where: { poId: id }
      });
      const orderItems = orderItemData.map(orderItem => orderItem.dataValues);
      console.log(orderItems);
      return orderItems;
    } catch (error) {
      throw error;
    }
  }

  static async updateOrder(order) {
    console.log("in updateOrder");
    try {
      await shopdb.po.update(order, { where: { id: order.id } });
      const updatedOrder = await shopdb.po.findOne({
        where: { id: order.id }
      });
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  }

  /**
   * * Order Item Services *
   */

  static async createOrderItem(orderItemData) {
    if (orderItemData.poId) {
      try {
        const date = new Date().toLocaleString();
        return await shopdb.poitems.create({
          poId: orderItemData.poId,
          partId: orderItemData.partId,
          qty: orderItemData.qty,
          lastUpdate: date
        });
      } catch (error) {
        throw error;
      }
    } else {
      return null;
    }
  }

  static async getOrderItem(id) {
    try {
      return await shopdb.poitems.findOne({
        where: { id: id }
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateOrderItem(orderItem) {
    try {
      const date = new Date().toLocaleString();
      await shopdb.poitems.update(
        {
          poId: orderItem.poId,
          partId: orderItem.partId,
          qty: orderItem.qty,
          lastUpdate: date
        },
        {
          where: {
            id: orderItem.id
          }
        }
      );
      return await shopdb.poitems.findOne({
        where: { id: orderItem.id }
      });
    } catch (error) {}
  }

  static async deleteOrderItem(id) {
    try {
      const orderItem = await shopdb.poitems.findOne({
        where: { id: id }
      });
      await shopdb.poitems.destroy({ where: { id: id } });
      if (orderItem) {
        await this.checkOrderCompletion(orderItem.poId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  static async finishOrderItem(itemId) {
    try {
      const date = new Date().toLocaleString();
      const item = await shopdb.poitems.update(
        { dateComplete: date },
        { where: { id: itemId } }
      );
      const orderComplete = await this.checkOrderCompletion(item.poId);
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

  static async checkOrderCompletion(poId) {
    try {
      const incompleteOrderItems = await shopdb.poitems.findAll({
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

  static prepOrderItemData(OrderItemData, order, parts) {
    let orderItems = [];
    console.log(OrderItemData.length);
    for (let i = 0; i < OrderItemData.length; i++) {
      orderItems.push({
        poId: order.poId,
        partId: parts[i].id,
        qty: OrderItemData[i].qty,
        lastUpdate: new Date().toLocaleString()
      });
    }
    return orderItems;
  }

  /**
   * * Part Services *
   */
  static async createPart(part) {
    try {
      return await shopdb.part.create(part);
    } catch (error) {
      throw error;
    }
  }

  static async getPart(id) {
    try {
      const part = await shopdb.part.findOne({
        where: { id: id }
      });
      return part;
    } catch (error) {
      throw error;
    }
  }

  static async updatePart(part) {
    try {
      await shopdb.part.update(part, { where: { id: part.id } });
      const updatedPart = await shopdb.part.findOne({
        where: { id: part.id }
      });
      return updatedPart;
    } catch (error) {
      throw error;
    }
  }

  static async deletePart(id) {
    try {
      part = await shopdb.part.findOne({ where: { id: id } });
      if (part) {
        await shopdb.part.destroy({ where: { id: id } });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  static async getPartList() {
    try {
      return await shopdb.part.findAll({
        attributes: ["id", "num", "desc"]
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllParts() {
    try {
      return await shopdb.part.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async findOrCreateNewParts(orderItemsData) {
    let partIds = [];
    const t = await shopdb.sequelize.transaction();

    try {
      for (const item of orderItemsData) {
        const [part, created] = await shopdb.part.findOrCreate({
          where: {
            num: item.num,
            rev: item.rev
          },
          defaults: {
            num: item.num,
            rev: item.rev,
            desc: item.desc,
            processing: item.processing,
            material: item.material,
            timeEstimate: item.timeEstimate
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

  /**
   * * Queue Services *
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

  static updateQueue(previousOrder, movedOrder, nextOrder) {
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

  static async getLastPO() {
    const lastOrder = await shopdb.lastpo.findOne({
      attribute: ["lastPO"],
      where: { id: 1 }
    });
    return lastOrder.lastPO;
  }
}

export default ShoptrackerService;
