import { Router } from 'express';
import FishbowlController from '../controllers/FishbowlController';

const router = Router();

router.get('/', FishbowlController.getAllOpenOrders);
router.get('/:id', FishbowlController.getOrderItems);

export default router;

//   app.get("/orders", (req, res) => {
//     orders.findOpenOrders(req, res, fbdb);
//   });
//   app.post("/order", (req, res) => {
//     orderItems.findOrderItems(req, res, fbdb);
//   });