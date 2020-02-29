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