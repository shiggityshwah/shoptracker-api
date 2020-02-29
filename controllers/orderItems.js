const findOrderItems = (req, res, db) => {
  const { id } = req.body
  let orderItems = []
  if ( !id ) {
    return res.status(400).json('incorrect form submission');
  }
  db.from("poitem")
    .select("*")
    .where({poId : id})
    .then(rows => {
      if (rows.length) {
        console.log("There are " + rows.length + " parts on PO#" + id);
        for (row of rows) {
            orderItems.push(row);
         }
         res.send(orderItems);
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
  findOrderItems
};
