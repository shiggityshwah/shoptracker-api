

//fetch data from PO table on Fishbowl

//fetch data from poitems table from Fishbowl

//fetch the lastPO from the lastPO table in shoptracker

//Insert data into PO table in shoptracker

//insert into part

//check if exists first for all inserts

//update lastPO table

//create lastpo table

//commit transaction

//why does poId not act as usedc b

//insert data into part table in shoptracker for each part that doesn't already exist


const addNewOrder = (req, res, fbdb, shopdb) => {
  const { id } = req.body;
  let order;
  let orderItems;

  //fetch data from PO table on Fishbowl
  fbdb
    .from("po")
    .select("id", "num", "buyer", "note", "dateIssued", "dateFirstShip")
    .where({ id: id })
    .then(rows => {
      if (rows.length === 1) {
        for (row of rows) {
          order.push(row);
        }
      } else if (rows.length > 1) {
        res.status(400).json("found multiple with same ID");
      } else {
        res.status(400).json("not found");
      }
    })
    .then(
      //fetch data from poitems table from Fishbowl
      fbdb
        .from("poitem")
        .select("partNum", "description", "revLevel", "qtyToFulfill")
        .where({ poId: id })
        .then(rows => {
          if (rows.length) {
            for (row of rows) {
              orderItems.push(row);
            }
          } else {
            res.status(400).json("not found");
          }
        })
    )
    .then(
      shopdb.transaction(trx => {
        let lastPO;
        let poId;
        //fetch the lastPO from the lastPO table in shoptracker
        shopdb
          .select("lastPO")
          .from("lastpo")
          .where({ id: 1 })
          .then(lastpoRows => {
            lastPO = lastpoRows[0].lastPO;
            //Insert data into PO table in shoptracker
            shopdb
              .insert({
                poId: order[0].id,
                num: order[0].num,
                buyer: order[0].buyer,
                note: order[0].note,
                dateIssued: order[0].dateIssued,
                dateLastModified: knex.raw("CURRENT_TIMESTAMP"),
                dateStarted: knex.raw("CURRENT_TIMESTAMP"),
                status: "PENDING",
                dateRequested: order[0].dateRequested,
                partQty: orderItems.length,
                nextPo: lastPO
              })
              .into("po")
              .returning("id");
          })
          //insert into part
          //check if exists first for all inserts
          //update lastPO table
          //create lastpo table
          //commit transaction
          //why does poId not act as usedc b
          .then(poRows => {
            poId = poRows[0].id;
            orderItems.forEach(orderItem => {
              //insert data into part table in shoptracker for each part that doesn't already exist
              shopdb
                .insert({
                  num: orderItem.partNum,
                  rev: orderItem.revLevel,
                  desc: orderItem.description
                })
                .into("part")
                .whereNotExists(() => {
                  shopdb
                    .select("num", "rev")
                    .from("part")
                    .where({
                      num: orderItem.partNum,
                      rev: orderItem.revLevel
                    })
                    .then(result => {
                      return result;
                    })
                    .catch(err => {
                      console.log(err);
                    });
                });
            });
          })
          .then(() => {
            //update lastPO in the lastpo table in shoptracker
            shopdb
              .insert({ lastPO: poId })
              .into("lastpo")
              .where({ id: 1 });
          })
          .then(() => {
            //gather the partId for each part in the po
            orderItems.forEach(orderItem => {
              shopdb
                .select("id")
                .from("part")
                .where({
                  part: orderItem.partNum,
                  rev: orderItem.revLevel
                })
                .then(partRows => {
                  shopdb
                  //Insert data into po Items
                    .insert({
                      poId: poId,
                      partId: partRows[0].id,
                      qty: orderItem.qtyToFulfill,
                      lastUpdate: knex.raw("CURRENT_TIMESTAMP"),
                      dateStarted: knex.raw("CURRENT_TIMESTAMP")
                    })
                    .into("poitems")
                    .then(trx.commit)
                    .catch(trx.rollback);
                });
            });
          });
      })
    );
};

module.exports = {
  addNewOrder
};
