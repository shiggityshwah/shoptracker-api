import { Router } from 'express';
import ShoptrackerController from '../controllers/ShoptrackerController';

const router = Router();

router.get('/', ShoptrackerController.getOpenOrders);
// router.post('/', BookController.addNewOrder);
router.get('/:id', ShoptrackerController.getOrderItems);
router.get('/add/:id', ShoptrackerController.addNewOrder);
// router.delete('/:id', BookController.deleteBook);

export default router;

// app.get("/", function(req, res) {
//     res.send("hello");
//   });
//   app.get("/orders", (req, res) => {
//     orders.findOpenOrders(req, res, fbdb);
//   });
//   app.get("/newOrders", (req, res) => {
//     newOrders.fetchNewOrders(req, res, fbdb, shopdb);
//   });
//   app.get("/addNewOrder", (req, res) => {
//     addNewOrder.addNewOrder(req, res, fbdb, shopdb);
//   });
//   app.post("/order", (req, res) => {
//     orderItems.findOrderItems(req, res, fbdb);
//   });