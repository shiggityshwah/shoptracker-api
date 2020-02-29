const fetchNewOrders = (req, res, fbdb, shopdb) => {
  let orders = [];
  fbdb
    .select("id", "buyer", "dateIssued", "note", "num")
    .from("po")
    .where({ vendorContact: "Beahm Designs" })
    .whereNull("dateCompleted")
    .whereNotNull("dateIssued")
    .then(rows => {
      if (rows.length) {
        console.log("There are " + rows.length + " new POs");
        for (row of rows) {
          orders.push(row);
        }
          let orderIds = [];

  orders.map(order => {
    orderIds = [...orderIds, order.id];
  });
  console.log(orders);
  shopdb
    .select("id")
    .from("po")
    .havingIn("poid", orderIds)
    .then(rows => {
      if (!rows.length) {
        console.log("found no matching orders");
        res.send(orders);
      } else {
        console.log("found " + rows.length + " matching orders");
        for (row of rows) {
          orders = orders.filter(order => order.id !== row.id);
        }
        res.send(orders);
      }
    })
    .catch(err => {
      console.log(err);
      throw err;
    });

      } else {
        res.status(400).json("not found");
      }
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

module.exports = {
  fetchNewOrders
};
