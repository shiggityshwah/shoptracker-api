import { Router } from 'express';
import ShoptrackerController from '../controllers/ShoptrackerController';
import ShoptrackerService from '../services/ShoptrackerService';

const router = Router();

router.get('/', ShoptrackerController.getOpenOrders);
// router.post('/', BookController.addNewOrder);
router.get('/:id', ShoptrackerController.getOrderItems);
router.get('/add/:id', ShoptrackerController.addNewOrder);
router.get('/parts/all/', ShoptrackerController.getAllParts);
router.get('/part/:id', ShoptrackerController.getPart);
router.post('/update/part/', ShoptrackerController.updatePart);
router.post('/update/order/', ShoptrackerController.updateOrder);
router.post('/update/orderitem/', ShoptrackerController.updateOrderItem);
router.post('/update/queue/', ShoptrackerController.updateQueue);

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