const findOpenOrders = (req, res, db) => {
    let orders = []
    db.from("po")
      .select("*")
      .where({ vendorContact: "Beahm Designs" })
      .whereNull("dateCompleted")
      .whereNotNull("dateIssued")
      .then(rows => {
        if (rows.length) {
          console.log('There are ' + rows.length + ' new POs')
          for (row of rows) {

            orders.push(row);
          }
          res.send(orders)
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
    findOpenOrders
  };
